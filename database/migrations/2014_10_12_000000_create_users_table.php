<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('first_name', 45)->nullable();
            $table->string('middle_name', 45)->nullable();
            $table->string('last_name', 45)->nullable();
            $table->string('email', 45);
            $table->string('profile_image', 1000)->default("/images/default_profile.png");
            $table->string('password');
            $table->string('designation', 45)->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
