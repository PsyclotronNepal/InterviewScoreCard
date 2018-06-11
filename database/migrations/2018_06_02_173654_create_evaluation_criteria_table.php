<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEvaluationCriteriaTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluation_criteria', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('title', 45)->nullable();
            $table->string('weight', 45)->nullable();
            $table->string('remarks', 45)->nullable();
            $table->integer('interview_id')->index('fk_evaluation_criteria_interview1_idx');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('evaluation_criteria');
    }

}
