<?php

namespace App\Http\Controllers;

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

    function get(Request $request, $adminId){
        $admin = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->find($adminId);
        return $admin;

    }
}
