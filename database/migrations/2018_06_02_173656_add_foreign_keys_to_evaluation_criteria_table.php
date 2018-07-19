<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToEvaluationCriteriaTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('evaluation_criteria', function (Blueprint $table) {
            $table->foreign('interview_id', 'fk_evaluation_criteria_interview1')->references('id')->on('interview')->onUpdate('cascade')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('evaluation_criteria', function (Blueprint $table) {
            $table->dropForeign('fk_evaluation_criteria_interview1');
        });
    }

}
