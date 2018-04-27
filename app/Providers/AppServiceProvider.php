<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        // TODO: move elsewhere
        Validator::extend('exists_for_user', function ($attribute, $value, $parameters, $validator)
        {
            return DB::table($parameters[0])
                ->where($parameters[1], '=', $value)
                ->where($parameters[2], '=', $parameters[3])
                ->count() >= 1;
        });        
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
