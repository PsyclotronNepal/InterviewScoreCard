import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';
import axios from "axios/index";
import InterviewerView from "../pages/InterviewerView";
import AdminView from "../pages/AdminView";

export default class UserCreateCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event) {

        if(this.props.admin) {
            axios.get('/api/admin/create/').then(response => {
                setPage(<AdminView data={response.data}/>);
            }).catch(errors => {
                console.log(errors);
                toastr['error'](" Message: " + errors.responseJSON.message, "Interviewer Detail Fetch Error [code: " + errors.status + "]");
            })
        }
        else{
            axios.get('/api/interviewer/create').then(response => {
                setPage(<InterviewerView data={response.data}/>);
            }).catch(errors => {
                console.log(errors);
                toastr['error'](" Message: " + errors.responseJSON.message, "Interviewer Detail Fetch Error [code: " + errors.status + "]");
            })

        }
    }


    render() {
        return <div className="card card-hover-effect mb-4">
            <a onClick={this.handleClick}>
                <div className="card-body">
                    <i className="fa fa-8x fa-user-plus"></i>
                </div>
                <div className="card-header text-primary">
                    {(this.props.admin)?
                    <div className="figure-caption shifted-left">Add Admin</div>
                        :
                        <div className="figure-caption shifted-left">Add Interviewer</div>}
                </div>
            </a>
        </div>
    }
}