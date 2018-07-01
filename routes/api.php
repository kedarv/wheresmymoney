<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['prefix' => 'auth', 'middleware' => 'api'], function () {
	Route::post('login', 'AuthController@login');
	Route::post('create', 'AuthController@create');
});

Route::group(['prefix' => 'user', 'middleware' => 'jwt.auth'], function () {
	Route::get('dashboard', 'UserController@getDashboard');
});

Route::group(['prefix' => 'account', 'middleware' => 'jwt.auth'], function () {
	Route::post('create', 'AccountController@create');
	Route::get('{account}', 'AccountController@getAccount');
	Route::get('/', 'AccountController@getAllAccounts');
});

Route::group(['prefix' => 'category', 'middleware' => 'jwt.auth'], function () {
	Route::post('create', 'CategoryController@create');
	Route::get('calculated/{month}/{year}', 'CategoryController@getCalculatedCategories');
	Route::get('{category}', 'CategoryController@getCategory');
	Route::get('current/{month}/{year}', 'CategoryController@getCategoriesForMonth');
	Route::get('/', 'CategoryController@getAllCategories');
});

Route::group(['prefix' => 'payee', 'middleware' => 'jwt.auth'], function () {
	Route::post('create', 'PayeeController@create');
	Route::get('{payee}', 'PayeeController@getPayee');
	Route::get('/', 'PayeeController@getAllPayees');	
});

Route::group(['prefix' => 'transactions', 'middleware' => 'jwt.auth'], function () {
	Route::post('create', 'TransactionsController@create');
	Route::get('{transaction}', 'TransactionsController@getTransactionById');
	Route::get('/', 'TransactionsController@getAllTransactions');
});