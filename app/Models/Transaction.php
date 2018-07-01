<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'transactions';

    /**
     * Get the account that has the transaction
     */
    public function account()
    {
        return $this->belongsTo('App\Models\Account');
    }

    /**
     * Get the user that has the transaction
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Get the payee associated with the transaction
     */
    public function payee()
    {
        return $this->belongsTo('App\Models\Payee');
    }

    /**
     * Get the category associated with the transaction
     */
    public function category()
    {
        return $this->hasOne('App\Models\Category');
    }
}