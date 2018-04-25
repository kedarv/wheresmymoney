<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use App\Models\Account;
use Auth;

class AccountController extends Controller
{
	public function create(Request $request)
	{
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'balance' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

		$account = new Account;
		$account->user_id = Auth::user()->id;
		$account->name = $request->name;
		$account->balance = $request->balance;
		$account->save();
		return $account;
	}

	public function getAccount(Account $account) {
		if($account->user_id == Auth::user()->id) {
			return $account;
		}
		return ['error' => 'Unauthorized'];
	}

	public function getAllAccounts() {
		return Auth::user()->accounts;
	}
}