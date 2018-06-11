<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->flush();
        $request->session()->regenerate();

        return redirect('/');
        //return ["success" => True];
    }

    public function loginUser(Request $request)
    {
        //return $request;
        //dd($request->all());
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            //Gets the details of logged in user
            $user = User::where('email', $request->email)->first();

            //Validates id user is hr or interviewer
            if ($user->roles()) {
                //if user is admin/hr
                return "hr";
            } elseif ($user->isInterviewer()) {
                return "interviewer";

            } else {
                return "unassigned";
            }
            //if user in interviewer

        }
        //if authentication not successful
        return "invalid login";//Redirect::back()->withInput();
    }

    public function getUser(Request $request)
    {
        $user = Auth::user();
        if ($user == null) {
            $user = Auth::user();
            if ($user == null) {
                return ["loggedin" => False];
            }
            $user->role = $user->roleList();
            $user->loggedin = "True";
            return $user;
            return ["loggedin" => False];
        }
        $user->role = $user->roleList();
        $user->loggedin = "True";
        return $user;
    }

    public function login(Request $request)
    {
        $data = $request->all();
        if (!isset($data['email']) || !isset($data['password'])) {
            return ['loggedin' => false, "reason" => "Invalid Post format"];
        }
        if (Auth::attempt([
            'email' => $data['email'],
            'password' => $data['password']
        ])) {

            return $this->getUser($request);
        }
        return ["loggedin" => false, "reason" => "Authentication Failure"];

    }

    public function addUser(Request $request)
    {
    }
}
