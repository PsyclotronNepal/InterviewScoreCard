<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\User;
use Faker\Provider\Image;
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

    function editInterviewer(Request $request, $interviewerId){
        $interviewer = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'interviewer');
        })->find($interviewerId);

        if($request->field_name = "image"){
            $image = $request->value;
            $path = public_path().'images/profile/' . $interviewerId;
            Image::make(file_get_contents($image))->save($path);
            $interviewer->update(array("profile_image" => $path));


        }
        $interviewer->update(array($request->field_name => $request->value));

    }

    function updateProfileImage(Request $request, $interviewerId){

        $interviewer = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'interviewer');
        })->find($interviewerId);
        $image = $request->value;
        $path = 'images/'.$interviewerId.'_'.str_random(2).'.'.$request->extension;
        \File::put($path, base64_decode($image));
        $interviewer->update(array("profile_image" => $path));

        return ["filename"=> $path];
    }

    function update(Request $request){
        $interviewer=User::find($request->id);
        if($interviewer->isInterviewer()){
            $interviewer->fill($request->all(['first_name','last_name','middle_name','email'  ]));
            $interviewer->save();
            return ["success"=>true];
        }
        else{
            return  ["error" => true, "message" => "User is not an Interviewer"];
        }
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
