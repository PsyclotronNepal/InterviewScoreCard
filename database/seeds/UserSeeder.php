<?php

namespace database\seeds;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = \App\Models\Role::all();

        // for each roles, create 50 users.
        foreach ($roles as $role) {
            factory(\App\User::class, 50)->create()->each(function (\App\User $u) use ($role) {
                $u->roles()->attach($role);
            });
        }

    }
}