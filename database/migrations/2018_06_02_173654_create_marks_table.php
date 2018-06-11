<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMarksTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('marks', function (Blueprint $table) {
            $table->integer('id', true);
            $table->float('score', 10, 0)->nullable();
            $table->string('remarks', 45)->nullable();
            $table->integer('interviewee_id')->nullable()->index('fk_marks_interviewee1_idx');
            $table->integer('interviewer_id')->nullable()->index('fk_marks_interviewer1_idx');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('marks');
    }

}
