<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('account_id')->unsigned();
            $table->integer('category_id')->unsigned();
            $table->integer('payee_id')->unsigned();
            $table->string('name');
            $table->float('amount', 8, 2);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('account_id')->references('id')->on('accounts');
            $table->foreign('category_id')->references('id')->on('category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
