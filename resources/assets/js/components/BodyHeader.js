import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';

export default class BodyHeader extends Component {
    render() {
        return <div className="row h1 text-center text-uppercase">
            <div id="content-header" className="col-md-12">
                {this.props.value}
                <hr id="header-separtion-line"/>
            </div>
        </div>
    }
}