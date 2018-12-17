<?php

use Illuminate\Http\Request;

// use App\Http\Controllers\InterviewController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('user')->group(function () {
    Route::get('/', 'UserController@getUser');
    Route::post('/login', 'UserController@login');
    Route::get('/logout', 'UserController@logout');
});

Route::prefix('interviewer')->group(function () {
    Route::get('/', 'InterviewerController@getList');
    Route::get('/create','InterviewerController@createInterviewer');
    Route::get('/{interviewer_id}',"InterviewerController@get");
    Route::get('/delete/{interviewer_id}',"InterviewerController@deleteInterviewer");
    Route::get('/{interviewer_id}/edit',"InterviewerController@editInterviewer");
    Route::post('/update','InterviewerController@update');
    Route::post('/{interviewer_id}/profile_image','InterviewerController@updateProfileImage');

});

Route::prefix('admin')->group(function () {
    Route::get('/', 'HrController@getList');
    Route::get('/create','HrController@createHr');
    Route::get('/{admin_id}',"HrController@get");
    Route::get('/delete/{admin_id}',"HrController@deleteHr");
    Route::post('/update','HrController@update');
    Route::post('/{admin_id}/profile_image','HrController@updateProfileImage');
});

Route::prefix('interview')->group(function () {
    // interview/
    // In:  null
    // Out: [{
    //         id:
    //          title:
    //          location:
    //          date:
    //      },....]
    Route::get('/', 'InterviewController@getList');


    // interview/create
    // In: null
    // Out: id:new_id
    //      success (true/false)
    Route::get('/create', 'InterviewController@createInterview');


    Route::get('/{interview_id}',"InterviewController@get");
    Route::get('/delete/{interview_id}',"InterviewController@deleteInterview");

    // interview/{interview_id}/edit
    // In: field_name : (title,date,location) -> one of these 3
    //    value  : the value to update with.
    // Out: success (true/false)
    Route::post('/{interview_id}/edit', 'InterviewController@editInterview');

    // interview/{interview_id}/interviewer/add/
    // In:
    // idOut:
    // Success (true/false)
    Route::post('/interviewer/add', 'InterviewController@testme');

    // interview/{interview_id}/interviewer/evaluation_criteria
    // In: interviewer_id
    // evaluation_id
    // Out: Success (true/false)
    Route::get('/{interview_id}/interviewer/evaluation_criteria', 'InterviewController@testme');

    // interview/{interview_id}/interviewee/create
    // In: name
    // Out: Success (true/false)
    //      Id
    Route::get('/{interview_id}/interviewee/create', 'InterviewController@testme');


    /*
    * [Routes list for interviewee]
    * Contains all routes that are to be included in interviewee section
    * The creation of interviewee assigns it to a interview. so we need not implicitly give the interview id parameter.
    */
    Route::prefix('interviewee')->group(function () {

        Route::get('/',"IntervieweeController@getInterviewee");

        // interview/{interview_id}/interviewee/create
        Route::post('/create','IntervieweeController@createInterviewee');

        // interview/{interview_id}/interviewee/{id}/edit
        // In: field_name: value
        // Out: Success (true/false)
        Route::get('/{interviewee_id}/edit', 'InterviewController@testme');

        // interview/{interview_id}/interviewee/{id}/qualification/create
        // In: null
        // Out: Success (true/false)
        // Id
        Route::get('/{interviewee_id}/qualification/create', 'InterviewController@testme');

        // interview/{interview_id}/interviewee/{id}/qualification/edit
        // In: id
        // field_name: value
        // Out: Success (true/false)
        Route::get('/{interviewee_id}/qualification/edit', 'InterviewController@testme');

        // interview/{interview_id}/interviewee/{id}/documents/create
        // In: document_type
        // Out: Success (true/false)
        // id
        Route::get('/{interviewee_id}/documents/create', 'InterviewController@testme');

        //   interview/{id}/interviewee/{id}/documents/{id}/edit
        // In: File
        // Out: Success (true/false)
        Route::get('/{interviewee_id}/documents/edit', 'InterviewController@testme');
    });




    Route::prefix('interviewer')->group(function () {
        Route::post('/add','InterviewController@addInterviewers');
        Route::post('/delete','InterviewController@deleteInterviewers');
        Route::post('/changeEvaluation', 'InterviewController@interviewerChangeEvaluationCriteria');
    });
});

Route::prefix('evaluation_criteria')->group(function(){

    // interview/{interview_id}/evaluation_criteria/create
    // In: null
    // Out: Success (true/false)
    // id

    // interview/{interview_id}/
    Route::get('/', 'InterviewController@createEvaluationCriteria');

    // interview/{interview_id}/evaluation_criteria/edit
    // In: id
    // field_name: value
    // Out: success (true/false)
    Route::post('/edit', 'InterviewController@editEvaluationCriteria');

    Route::post('/delete','InterviewController@deleteEvaluationCriteria');
});
Route::get('/', function () {
    return "home";
});
