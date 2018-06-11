<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIntervieweeTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interviewee', function (Blueprint $table) {
            $table->string('first_name', 50)->nullable();
            $table->string('middle_name', 45)->nullable();
            $table->string('last_name', 45)->nullable();
            $table->integer('id', true);
            $table->string('email', 50)->nullable();
            $table->integer('interview_id')->index('fk_interviewee_interview1_idx');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('interviewee');
    }

}
