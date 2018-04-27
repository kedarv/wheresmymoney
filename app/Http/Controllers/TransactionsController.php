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
		$user_id = Auth::user()->id;
        $validator = Validator::make($request->all(), [
            'account_id' => 'required|exists_for_user:accounts,id,user_id,' . $user_id,
            'category_id' => 'required|exists_for_user:category,id,user_id,' . $user_id,
            'payee_id' => 'required||exists_for_user:payees,id,user_id,' . $user_id,
            'outflow' => 'required|numeric',
            'inflow' => 'required|numeric',
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
		$transaction->outflow = $request->outflow;
		$transaction->inflow = $request->inflow;
		$transaction->save();
		return $transaction;
	}

	public function getTransactionById(Transaction $transaction) {
		if($transaction->user_id == Auth::user()->id) {
			return $transaction;
		}
		return ['error' => 'Unauthorized'];
	}

	public function getAllTransactions() {
		return Auth::user()->transactions;
	}
}