<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Category;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return ['email' => $this->email];
    }

    /**
     * Get the categories for the user
     */
    public function category()
    {
        return $this->hasMany('App\Models\Category');
    }

    /**
     * Get the accounts for the user
     */
    public function accounts()
    {
        return $this->hasMany('App\Models\Account');
    }

    /**
     * Get the transactions for the user
     */
    public function transactions()
    {
        return $this->hasMany('App\Models\Transaction');
    }

    /**
     * Get the payees for the user
     */
    public function payees()
    {
        return $this->hasMany('App\Models\Payee');
    }

    public function net_worth() {
        return $this->accounts->sum('balance');
    }

    public function postSignupActions() {
        $category = new Category;
        $category->user_id = $this->id;
        $category->name = "Internal Category";
        $category->amount = 0;
        $category->internal = true;
        $category->save();

        $payee = new Payee;
        $payee->user_id = $this->id;
        $payee->name = "Internal Payee";
        $payee->internal = true;
        $payee->save();

        $this->internal_category = $category->id;
        $this->internal_payee = $payee->id;
        $this->save();     
    }
}
