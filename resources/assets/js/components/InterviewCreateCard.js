import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';
import axios from "axios/index";
import InterviewView from "../pages/InterviewView";

export default class InterviewCreateCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event) {
        axios.get('/api/interview/create/').then(response => {
            setPage(<InterviewView data={response.data}/>);
        }).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors.responseJSON.message, "Interview Create Error [code: " + errors.status + "]");
        })
    }



    render() {
        return <div className="card card-hover-effect mb-3">
            <a onClick={this.handleClick}>
                <div className="card-body">
                    <div className="card-subtitle text-success">
                        <i className="fa fa-4x fa-calendar-plus"></i></div>
                    <div className="card-text">Create Interview</div>
                </div>
            </a>
        </div>
    }
}