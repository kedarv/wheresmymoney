<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;

class UserController extends Controller
{
    public function getDashboard()
    {
        return ['accounts' => Auth::user()->accounts, 'net_worth' => Auth::user()->net_worth()];
    }
}
