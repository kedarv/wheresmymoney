<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Validator;

class CategoryController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'   => 'required',
            'amount' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $category = new Category();
        $category->user_id = Auth::user()->id;
        $category->name = $request->name;
        $category->amount = $request->amount;
        $category->save();

        return $category;
    }

    public function getCategory(Category $category)
    {
        if ($category->user_id == Auth::user()->id) {
            return $category;
        }

        return ['error' => 'Unauthorized'];
    }

    public function getCalculatedCategories(Request $request)
    {
        $categories = $this->categories_given_month_year($request->month, $request->year);
        foreach ($categories as $category) {
            $calculated = Transaction::whereBetween('date', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                                ->where('category_id', $category->id)->value(DB::raw('SUM(inflow) - SUM(outflow)'));
            $category->remaining_calculated = $category->amount + $calculated;
        }

        return $categories;
    }

    public function getAllCategories()
    {
        return Category::where('user_id', Auth::user()->id)->where('internal', 0)->get();
    }

    public function getCategoriesForMonth(Request $request)
    {
        return $this->categories_given_month_year($request->month, $request->year);
    }

    public function categories_given_month_year($month, $year)
    {
        $start = Carbon::create($year, $month)->startOfMonth();
        $end = $start->copy()->endOfMonth();

        return Category::where('user_id', Auth::user()->id)
            ->where('internal', 0)
            ->whereBetween('created_at', [$start, $end])
            ->get();
    }
}
