<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;

class AccountController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'    => 'required',
            'balance' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $account = new Account();
        $account->user_id = Auth::user()->id;
        $account->name = $request->name;
        $account->balance = $request->balance;
        $account->save();

        $transaction = new Transaction();
        $transaction->user_id = Auth::user()->id;
        $transaction->account_id = $account->id;
        $transaction->category_id = Auth::user()->internal_category;
        $transaction->payee_id = Auth::user()->internal_payee;
        $transaction->memo = 'Account '.$account->name.' Created';
        $transaction->outflow = 0;
        $transaction->inflow = $account->balance;
        $transaction->date = new Carbon();
        $transaction->save();

        return $account;
    }

    public function getAccount(Account $account)
    {
        if ($account->user_id == Auth::user()->id) {
            return $account;
        }

        return ['error' => 'Unauthorized'];
    }

    public function getAllAccounts()
    {
        return Auth::user()->accounts;
    }
}
