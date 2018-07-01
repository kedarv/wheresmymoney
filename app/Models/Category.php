<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'category';

    /**
     * Get the user that owns the category.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Get the transactions for the category.
     */
    public function transactions()
    {
        return $this->hasMany('App\Models\Transactions');
    }
}
