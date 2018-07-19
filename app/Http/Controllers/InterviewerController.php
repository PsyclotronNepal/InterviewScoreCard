<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\User;
use Illuminate\Http\Request;
use App\Models\Interviewer;
use Illuminate\Support\Facades\Auth;
/**
 *
 * It includes all the functions that are to be performed in interviewer page
 */
class InterviewerController extends Controller
{
    //
    //
    var $per_page = 10;

    function getList(Request $request){
        if ($request->term) {
            return $this->searchInterviewer($request);
        }


        $interviewers = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'interviewer');
        })->get();

        return $interviewers;
    }


    function searchInterviewer(Request $request){
        $interviewers = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'interviewer');
        })->where('first_name', 'like', '%' . $request->term . '%')->get();

        return $interviewers;

    }

    function get(Request $request, $interviewerId){
            $interviewer = User::whereHas('roles', function ($query) {
                $query->where('name', '=', 'interviewer');
            })->find($interviewerId);
            return $interviewer;

    }

    function deleteInterviewer(Request $request, $interviewerId){
        $interviewer = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'interviewer');
        })->find($interviewerId);
        $interviewer->delete();

        return $this->getList($request);
    }

    function selectInterviewee(){

    }
    function submitScore(){

    }
    function getDocument()
    {
      # code...
    }
    function getAllScore(){

    }
    function viewIntervieweeDetails(){

    }
    function getMyAssignedInterview(){

    }

    function openInterview(){

    }
    function getOtherInterviewer(){

    }

    function viewMyProfile(){

    }

}
