<?php

namespace App;

use App\Models\Admin;
use App\Models\UserRole;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'id';

    protected $fillable = [
        'first_name', 'middle_name', 'last_name', 'email', 'password', 'designation', 'profile_image'
    ];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', "created_at", "updated_at"
    ];

    //function to check is user is admin or // NOTE:
    //returns true if admin
    //returns false is interviewer
    public function isAdmin()
    {
        return $this->hasRole('admin');

    }


    public function isInterviewer()
    {
        return $this->hasRole("interviewer");
    }

    public function hasRole(string $role)
    {
        return $this->roles()->where("name", $role)->exists();
    }


    public function interviews()
    {
        return $this->belongsToMany(\App\Models\Interview::class, 'interviewer_has_interview', 'interviewer_id', 'interview_id');
    }

    public function marks()
    {
        return $this->hasMany(\App\Models\Mark::class, 'interviewer_id');
    }

    public function roles()
    {
        return $this->belongsToMany(\App\Models\Role::class, 'user_role', "user_id", "role_id");
    }

    public function roleList()
    {
        $roles = [];

        foreach ($this->roles()->get() as $role) {
            $roles[] = $role->name;
        }
        return $roles;
    }

}
