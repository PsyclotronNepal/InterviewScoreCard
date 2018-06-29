<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/main.css">
    <title>LIS Interview</title>
  </head>


  <body>
  {{--Header layout is included and will be cached for faster loading  --}}
    @extends('layouts.header')

    <div class="row align-content-center">
        <form class="login-form" method="POST" action="{{route("custom.login")}}">
          {{ csrf_field() }}
            <h1 class="text-primary text-center mb-5 pb-3">Login Required</h1>
            <div class="form-group form-inline {{ $errors->has('email') ? ' has-error' : '' }}">
                <div class="col-2 pr-2  text-center">
                    <i class="fa fa-user "></i>
                </div>

                <input id="email" type="email" name="email" class="form-control col-10" placeholder="Email Address" title="email address" value="{{ old('email') }}" required autofocus>
                       @if ($errors->has('email'))
                           <span class="help-block">
                               <strong>{{ $errors->first('email') }}</strong>
                           </span>
                       @endif

            </div>
            <div class="form-group form-inline log-status {{ $errors->has('password') ? ' has-error' : '' }}">
                <div class="col-2 pr-2 text-center">
                    <i class="fa fa-lock pr-2"></i>
                </div>
                <input type="password" name="password"class="form-control col-10" id="password" title="password" required>
                @if ($errors->has('password'))
                    <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
            </div>

            <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                        </label>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <span class="error">Invalid Credentials</span>
                {{-- <a class="link" href="#">Lost your password?</a> --}}
                <a class="btn btn-link" href="{{ route('password.request') }}">
                    Forgot Your Password?
                </a>
                <button id="login-btn" type="submit" class="match-parent-width   mt-4">Login</button>
            </div>
        </form>
    </div>

  </body>
</html>
