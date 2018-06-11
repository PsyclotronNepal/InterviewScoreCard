<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToEduDegreeTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('edu_degree', function (Blueprint $table) {
            $table->foreign('interviewee_id', 'fk_edu_degree_interviewee1')->references('id')->on('interviewee')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('edu_degree', function (Blueprint $table) {
            $table->dropForeign('fk_edu_degree_interviewee1');
        });
    }

}
