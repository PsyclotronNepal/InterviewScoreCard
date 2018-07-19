<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUserRoleTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_role', function (Blueprint $table) {
            $table->foreign('role_id', 'fk_user_role_role1')->references('id')->on('role')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id', 'fk_user_role_user1')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_role', function (Blueprint $table) {
            $table->dropForeign('fk_user_role_role1');
            $table->dropForeign('fk_user_role_user1');
        });
    }

}
