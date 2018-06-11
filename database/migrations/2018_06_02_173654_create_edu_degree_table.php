<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEduDegreeTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('edu_degree', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('degree', 45)->nullable();
            $table->string('institution', 45)->nullable();
            $table->float('marks', 10, 0)->nullable();
            $table->string('remarks', 45)->nullable();
            $table->integer('interviewee_id')->nullable()->index('fk_edu_degree_interviewee1_idx');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('edu_degree');
    }

}
