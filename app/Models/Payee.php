<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payee extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'payees';

    /**
     * Get the user that has the payee
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Get the transaction that has the payee
     */
    public function transaction()
    {
        return $this->hasMany('App\Models\Transaction');
    }
}