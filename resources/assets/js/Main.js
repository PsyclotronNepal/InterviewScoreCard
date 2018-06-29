import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as toastr from 'toastr';
import { setAppInstance, pageUser } from './Base';
import Login from "./components/Login";
import Interviews from "./components/Interviews";

export default class Main extends Component {
    constructor(props) {
        super(props)
        // the app should initialize the toaster first.
        toastr.options.positionClass = 'toast-bottom-full-width';
        toastr.options.extendedTimeOut = 1000;
        toastr.options.timeOut = 5000;
        toastr.options.fadeOut = 250;
        toastr.options.fadeIn = 250;

        this.state = {
            renderer: null,
            user: {loggedin: false}
        }
        if(pageUser().loggedin){
            this.state.current_page=<Interviews/>;
        }
        else{
            this.state.current_page=<Login/>;

        }
    }

    componentDidMount() {
        setAppInstance(this);
    }

    render() {
        return this.state.current_page;
    }
    changeRenderer(renderer) {
        this.setState({current_page: renderer})
    }
}

if (document.getElementById('react-content')) {
    ReactDOM.render(<Main/>, document.getElementById('react-content'));
}
