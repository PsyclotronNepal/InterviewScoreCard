<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Interview</title>
    {{-- <script src="https://unpkg.com/react@16/umd/react.development.js"></script> --}}
    {{-- <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script> --}}
    {{-- <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script> --}}

    {{Html::script('js/react/babel.min.js'),array('type'=>'text/javascript')}}
    {{Html::script('js/react/react.development.js'),array('type'=>'text/javascript')}}
    {{Html::script('js/react/react-dom.development.js'),array('type'=>'text/javascript')}}

    {{ Html::style('font-awesome/css/fontawesome-all.min.css') }}
    {{ Html::style('bootstrap/css/bootstrap.min.css') }}
    {{ Html::style('css/base.css') }}
    {{ Html::style('css/app.css') }}
    {{ Html::style('toaster/toaster.css') }}



    {{ Html::script("js/jquery-3.3.1.min.js")}}
    {{ Html::script("toaster/toaster.min.js")}}
    {{ Html::script ("js/base.js") }}
    {{ Html::script('js/app.js',array('type'=>"text/babel"))}}
    {{ HTML::script('js/auth.js',array('type'=>"text/babel"))}}
    {{ Html::script("js/Interviews.js",array('type'=>"text/babel"))}}
    {{ Html::script("js/InterviewEdit.js",array('type'=>"text/babel"))}}



</head>

<body>
<div id="react-content"></div>
<script type="text/babel">
    ReactDOM.render(
            <App />,
            document.getElementById("react-content")
    );


</script>
<!--


  To set up a production-ready React build environment, follow these instructions:
  * https://reactjs.org/docs/add-react-to-a-new-app.html
  * https://reactjs.org/docs/add-react-to-an-existing-app.html

  You can also use React without JSX, in which case you can remove Babel:
  * https://reactjs.org/docs/react-without-jsx.html
  * https://reactjs.org/docs/cdn-links.html
-->
</body>

{{Html::script("bootstrap/js/bootstrap.min.js")}}

</html>
