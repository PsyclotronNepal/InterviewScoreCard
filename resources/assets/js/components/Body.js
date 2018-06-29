import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';

export default class Body extends Component {
    render() {
        return <div className="col-lg-10 col-sm-9 container-fluid" id="content">
            {this.props.children}
        </div>
    }
}