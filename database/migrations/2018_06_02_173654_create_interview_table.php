<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInterviewTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interview', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('title', 45)->nullable();
            $table->dateTime('date')->nullable();
            $table->string('location', 45)->nullable();
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('interview');
    }

}
