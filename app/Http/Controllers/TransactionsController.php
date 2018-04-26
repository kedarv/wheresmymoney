<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\Payee;
use App\Models\Account;
use Auth;

class TransactionsController extends Controller
{
	public function create(Request $request)
	{
        $validator = Validator::make($request->all(), [
            'account_id' => 'required',
            'category_id' => 'required',
            'payee_id' => 'required',
            'amount' => 'required|numeric',
            'outflow' => 
            'inflow' =>
            // TODO: Write custom validators for outflow/inflow boolean sometimes
            // TODO: Write custom validator to check existence of above attributes for specified user (or maybe use exists query)
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

		$transaction = new Transaction;
		$transaction->user_id = Auth::user()->id;
		$transaction->account_id = $request->account_id;
		$transaction->category_id = $request->category_id;
		$transaction->payee_id = $request->payee_id;
		$transaction->memo = $request->memo;
		$transaction->type = $request->type;
		$transaction->outflow = $request->outflow;
		$transaction->inflow = $request->inflow;
		$transaction->save();
		return $transaction;
	}

	public function getCategory(Category $category) {
		if($category->user_id == Auth::user()->id) {
			return $category;
		}
		return ['error' => 'Unauthorized'];
	}

	public function getAllCategories() {
		return Auth::user()->category;
	}
}