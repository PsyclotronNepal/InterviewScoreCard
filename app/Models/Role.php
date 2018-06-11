<?php

/**
 * Created by Reliese Model.
 * Date: Sat, 02 Jun 2018 17:36:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Role
 *
 * @property int $id
 * @property string $name
 *
 * @property \Illuminate\Database\Eloquent\Collection $users
 *
 * @package App\Models
 */
class Role extends Eloquent
{
    protected $table = 'role';
    public $timestamps = false;

    protected $fillable = [
        'name'
    ];

    public function users()
    {
        return $this->belongsToMany(\App\Models\User::class, 'user_role');
    }

    static public function admins()
    {
        //TODO
    }

    static public function interviewers()
    {
        //TODO
    }
}
