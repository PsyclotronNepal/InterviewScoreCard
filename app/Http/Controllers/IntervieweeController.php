<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use App\Models\Interviewee;
use App\Models\InterviewerHasInterview;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class IntervieweeController extends Controller
{
    function get(Request $request,$interview_id){
        if(Auth::user()->isAdmin()) {
            return Interviewee::where('interview_id', $interview_id)->all();
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];
    }

    function createInterviewee(Request $request,$interview_id)
    {
        if (Auth::user()->isAdmin()) {
            $interviewee =new Interviewee();
            $interviewee->interview_id=$interview_id;
            $interviewee->save();
            return $interviewee;
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];
    }

    function editInterviewee()
    {
        if (Auth::user()->isAdmin()) {

            return ['error' => false];
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];
    }

    function deleteInterviewee()
    {
        if (Auth::user()->isAdmin()) {
            return ['error' => false];
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];
    }
}