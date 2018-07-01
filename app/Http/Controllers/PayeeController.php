<?php

namespace App\Http\Controllers;

use App\Models\Payee;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Validator;

class PayeeController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:payees,name,NULL,id,user_id,'.Auth::user()->id,
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $payee = new Payee();
        $payee->user_id = Auth::user()->id;
        $payee->name = $request->name;
        $payee->save();

        return $payee;
    }

    public function getPayee(Payee $payee)
    {
        if ($payee->user_id == Auth::user()->id) {
            return $payee;
        }

        return ['error' => 'Unauthorized'];
    }

    public function getAllPayees()
    {
        return Payee::where('user_id', Auth::user()->id)->where('internal', 0)->get();
    }
}
