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
        if (Auth::user()->isAdmin()) {
            $i = new Interview();
            $i->save();
            $i->error = false;
            return $i;
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];
    }

    function editInterview(Request $request)
    {
        if(Auth::user()->isAdmin()){
            $i=Interview::where('id',$request->interview_id)
                ->update(array($request->field_name => $request->value));
            if($i){
                return ['error' => false];
            }
            return ['error'=>true,"message"=> "Unexpected error while updating database"];
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];
    }



    function createEvaluationCriteria(Request $request)
    {
        if(Auth::user()->isAdmin()){
            $criteria=new EvaluationCriteria();
            $criteria->interview_id=$request->interview_id;
            $criteria.save();

            return ['error' => false];
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];
    }
    function getEvaluationCriteria()
    {
        if(Auth::user()->isAdmin()){
            return ['error' => false];
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];

    }

    function editEvaluationCriteria()
    {
        if(Auth::user()->isAdmin()){
            return ['error' => false];
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];

    }

    function deleteEvaluationCriteria()
    {
        if(Auth::user()->isAdmin()){
            return ['error' => false];
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];
    }

    function assignEvaluationCriteria()
    {
        if(Auth::user()->isAdmin()){
            return ['error' => false];
        }
        return ['error' => true, "message" => "You Don't have enough permission for this operation"];
    }
}
