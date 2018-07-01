<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Category;
use App\Models\Payee;
use App\Models\Transaction;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;

class TransactionsController extends Controller
{
    public function create(Request $request)
    {
        $user_id = Auth::user()->id;
        $validator = Validator::make($request->all(), [
            'account_id'  => 'required|exists_for_user:accounts,id,user_id,'.$user_id,
            'category_id' => 'required|exists_for_user:category,id,user_id,'.$user_id,
            'payee_id'    => 'required|exists_for_user:payees,id,user_id,'.$user_id,
            'outflow'     => 'required_without:inflow|numeric',
            'inflow'      => 'required_without:outflow|numeric',
            'date'        => 'required|date',
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $transaction = new Transaction();
        $transaction->user_id = Auth::user()->id;
        $transaction->account_id = $request->account_id;
        $transaction->category_id = $request->category_id;
        $transaction->payee_id = $request->payee_id;
        $transaction->memo = $request->memo;
        $transaction->outflow = $request->outflow ?: 0;
        $transaction->inflow = $request->inflow ?: 0;
        $transaction->date = new Carbon($request->date);
        $transaction->save();

        $account = Account::where('id', $transaction->account_id)->first();
        $account->balance = $account->balance + $transaction->inflow - $transaction->outflow;
        $account->save();

        return Transaction::find($transaction->id);
    }

    public function getTransactionById(Transaction $transaction)
    {
        if ($transaction->user_id == Auth::user()->id) {
            return $transaction;
        }

        return ['error' => 'Unauthorized'];
    }

    public function getAllTransactions()
    {
        $user = Auth::user();

        return Transaction::with('payee')
            ->where('user_id', $user->id)
            ->where('category_id', '!=', Auth::user()->internal_category)
            ->where('payee_id', '!=', $user->internal_payee)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
