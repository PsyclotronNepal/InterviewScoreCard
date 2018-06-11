<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToMarksTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('marks', function (Blueprint $table) {
            $table->foreign('interviewee_id', 'fk_marks_interviewee1')->references('id')->on('interviewee')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign('interviewer_id', 'fk_marks_interviewer1')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('marks', function (Blueprint $table) {
            $table->dropForeign('fk_marks_interviewee1');
            $table->dropForeign('fk_marks_interviewer1');
        });
    }

}
