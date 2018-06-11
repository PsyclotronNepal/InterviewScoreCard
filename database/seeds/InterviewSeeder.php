<?php

namespace database\seeds;

use App\Models\Interview;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class InterviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Interview::class, 50)->create();
    }

}
