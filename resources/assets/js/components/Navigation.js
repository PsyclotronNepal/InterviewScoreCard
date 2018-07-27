import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage, getActiveNavItem, setActiveNavItem} from '../Base';
import Interviewers from "../pages/Interviewers";
import Admins from "../pages/Admins";
import Interviews from "../pages/Interviews";
import Profile from "../pages/Profiles"


export default class Navigation extends Component {

    constructor(props){
        super(props);
        this.state ={
            active: 1
        };
    }
    handleInterviewersClick(event){
        setPage(<Interviewers />);
        setActiveNavItem(2);
    }
    handleAdminsClick(event) {
        setPage(<Admins/>);
        setActiveNavItem(3);
    }

    handleInterviewsClick(event){
        setPage(<Interviews user={pageUser()}/>);
        setActiveNavItem(1);
    }
    handleProfileClick() {
        setPage(<Profile user={pageUser()}/>);
        setActiveNavItem(2);
    }


    render() {
        var notActive="nav-item text-center";
        var active="nav-item active text-center";
        return <nav className="col-lg-2 col-sm-3 " id="navbar">
            {this.props.user.role.includes("admin") ?
                <div id="nav-content">
                    <div className={getActiveNavItem()==1?active:notActive} onClick={this.handleInterviewsClick}><span>
                    <i className="fa fa-map-marker"></i> Interviews</span>
                    </div>
                    <div className={getActiveNavItem()==2?active:notActive} onClick={this.handleInterviewersClick}><span>
                        <i className="fa fa-map-marker"></i> Interviewers</span>
                    </div>
                    <div className={getActiveNavItem()==3?active:notActive} onClick={this.handleAdminsClick}><span><i className="fa fa-map-marker"></i> Admins</span>
                    </div>
                </div>:
                <div id="nav-content">
                    <div className={getActiveNavItem()==1?active:notActive} onClick={this.handleInterviewsClick}><span>
                    <i className="fa fa-map-marker"></i> Interviews</span>
                    </div>
                    <div className={getActiveNavItem()==2?active:notActive} onClick={this.handleProfileClick}><span>
                        <i className="fa fa-map-marker"></i> Profile</span>
                    </div>

                </div>
            }
        </nav>
    }

}