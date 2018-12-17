<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\User;

class HrController extends Controller
{
    //
    function getList(Request $request){
        if ($request->term) {
            return $this->searchHr($request);
        }


        $interviewers = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->get();

        return $interviewers;
    }


    function searchHr(Request $request){
        $interviewers = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->where('first_name', 'like', '%' . $request->term . '%')->get();

        return $interviewers;

    }

    function deleteHr(Request $request, $adminId){
        $admin = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->find($adminId);
        $admin->delete();

        return $this->getList($request);

    }

    function editHr(Request $request, $adminId){
        $admin = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->find($adminId);
        $admin->update(array($request->field_name => $request->value));

    }
    function createHr(Request $request){
        $user = new User();
        $user->email = " ";
        $user->password = "random1234";
        $user->save();
        $role = Role::where('name','like','admin')->get();
        $user->roles()->attach($role);
        $user->save();
        return $this->get($request, $user->id);
    }

    function get(Request $request, $adminId){
        $admin = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->find($adminId);
        return $admin;

    }
    function update(Request $request){
        $admin=User::find($request->id);
        if($admin->isAdmin()){
            $admin->fill($request->all(['first_name','last_name','middle_name','email'  ]));
            $admin->save();
            return ["success"=>true];
        }
        else{
            return  ["error" => true, "message" => "User is not an Admin"];
        }
    }

    function updateProfileImage(Request $request, $adminId){

        $admin = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->find($adminId);
        $image = $request->value;
        $path = 'images/profile/'.$adminId.'_'.str_random(2).'.'.$request->extension;
        \File::put($path, base64_decode($image));
        $admin->update(array("profile_image" => $path));

        return ["filename"=> $path];
    }
}
