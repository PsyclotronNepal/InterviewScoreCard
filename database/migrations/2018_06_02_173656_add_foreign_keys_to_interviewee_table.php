<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToIntervieweeTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('interviewee', function (Blueprint $table) {
            $table->foreign('interview_id', 'fk_interviewee_interview1')->references('id')->on('interview')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('interviewee', function (Blueprint $table) {
            $table->dropForeign('fk_interviewee_interview1');
        });
    }

}
