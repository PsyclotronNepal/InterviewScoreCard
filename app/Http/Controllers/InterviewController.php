<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use App\Models\InterviewerHasInterview;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InterviewController extends Controller
{
    var $per_page = 10;

    function testme()
    {
        return "success";
    }

    function getList(Request $request)
    {


        if ($request->term) {
            return $this->searchInterview($request);
        }
        $user = Auth::user();
        if ($user) {
            if ($user->isAdmin()) {
                return Interview::orderBy('date', 'desc')->simplePaginate($this->per_page);
            } else if ($user->isInterviewer()) {
                return $user->interviews()->orderBy('date', 'desc')->simplePaginate($this->per_page);
            } else {
                return ['error' => true, "message" => "You are not assigned any roles"];
            }

        } else {
            return ["error" => true, "message" => "Login to use the api"];
        }
    }

    function searchInterview(Request $request)
    {
        $user = Auth::user();
        if ($user->isAdmin()) {
            return Interview::where('title', 'like', '%' . $request->term . '%')->simplePaginate($this->per_page);
        } elseif ($user->isInterviewer()) {
            return $user->interviews()->where('title', 'like', '%' . $request->term . '%')->simplePaginate($this->per_page);
        }
        return ['error' => true, "message" => "You are not assigned any roles"];
    }

    function getid(Request $request)
    {
        return $request;
    }

    function createInterview(Request $request)
    {
      $user=Auth::user();
      if($user->isAdmin()){
        // TODO: Code to create interview with given request

      }elseif ($user->isInterviewer()) {
        return ['error'=>true,'message'=>'You cannot create new interview'];
      }
      else {
        //redirect to home page or show error
      }

    }
    function openInterview()
    {

    }

    function editInterview()
    {
    }

    function viewResult()
    {
    }

    function addInterviewer()
    {
    }

    function removeInterviewer()
    {
    }

    function editInterviewee()
    {
    }

    function createInterviewee()
    {

    }

    function deleteInterviewee()
    {

    }

    function getEvaluationCriteria()
    {

    }

    function editEvaluationCriteria()
    {

    }

    function deleteEvaluationCriteria()
    {

    }

    function assignEvaluationCriteria()
    {

    }
}
