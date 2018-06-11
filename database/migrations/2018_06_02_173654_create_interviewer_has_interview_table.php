<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInterviewerHasInterviewTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interviewer_has_interview', function (Blueprint $table) {
            $table->integer('interviewer_id')->index('fk_interviewer_has_interview_interviewer1_idx');
            $table->integer('interview_id')->index('fk_interviewer_has_interview_interview1_idx');
            $table->integer('evaluation_id')->index('fk_interviewer_has_interview_evaluation_criteria1_idx');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('interviewer_has_interview');
    }

}
