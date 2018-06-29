import React, {Component} from "react";
import * as toastr from 'toastr';
require('../Base');

export default class Navigation extends Component {

    render() {
        return <nav className="col-lg-2 col-sm-3 " id="navbar">
            <div id="nav-content">
                <div className="nav-item active text-center"><span>
                    <i className="fa fa-map-marker"></i> Interviews</span>
                </div>
                <a href="interviewer-list.html">
                    <div className="nav-item text-center"><span>
                        <i className="fa fa-map-marker"></i> Interviewers</span>
                    </div>
                </a>
                <a href="admin-list.html">
                    <div className="nav-item text-center"><span><i className="fa fa-map-marker"></i> Admin</span>
                    </div>
                </a>
            </div>
        </nav>
    }
}