<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use App\Models\Account;
use Auth;

class UserController extends Controller
{
	public function getDashboard() {
		return ['accounts' => Auth::user()->accounts, 'net_worth' => Auth::user()->net_worth()];
	}
}