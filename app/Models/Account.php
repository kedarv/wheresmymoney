<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'accounts';

    /**
     * Get the user that owns the account
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Get the transactions for the account
     */
    public function transactions()
    {
        return $this->hasMany('App\Models\Transaction');
    }
}