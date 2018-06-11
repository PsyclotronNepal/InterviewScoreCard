<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToInterviewerHasInterviewTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('interviewer_has_interview', function (Blueprint $table) {
            $table->foreign('evaluation_id', 'fk_interviewer_has_interview_evaluation_criteria1')->references('id')->on('evaluation_criteria')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign('interview_id', 'fk_interviewer_has_interview_interview1')->references('id')->on('interview')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign('interviewer_id', 'fk_interviewer_has_interview_interviewer1')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('interviewer_has_interview', function (Blueprint $table) {
            $table->dropForeign('fk_interviewer_has_interview_evaluation_criteria1');
            $table->dropForeign('fk_interviewer_has_interview_interview1');
            $table->dropForeign('fk_interviewer_has_interview_interviewer1');
        });
    }

}
