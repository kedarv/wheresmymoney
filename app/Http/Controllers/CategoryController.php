<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use App\Models\Category;
use Auth;

class CategoryController extends Controller
{
	public function create(Request $request)
	{
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:category,name,NULL,id,user_id,'.Auth::user()->id
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

		$category = new Category;
		$category->user_id = Auth::user()->id;
		$category->name = $request->name;
		$category->save();
		return $category;
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