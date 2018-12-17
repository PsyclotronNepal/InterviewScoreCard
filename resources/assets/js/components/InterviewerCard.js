import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';
import axios from "axios/index";
import InterviewerView from "../pages/InterviewerView";
import Interviewers from "../pages/Interviewers";

export default class InterviewerCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick({target: event.target, key: this.props['data-id']});
        }
    }

    handleDelete(event) {
        axios.get('/api/interviewer/delete/' + this.props['data-id']).then(response=>{
            setPage(<Interviewers interviewers={response.data}/>);
        }).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors.message, "Interviewer Delete Error(see if interviewer has assigned interviews");
        })
    }

    handleEdit(event) {
        axios.get('/api/interviewer/' + this.props['data-id']).then(response=>{
            setPage(<InterviewerView data={response.data}/>);
        }).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors.responseJSON.message, "Interviewer Detail Fetch Error [code: " + errors.status + "]");
        })
    }

    render() {
        return <div className="card card-hover-effect mb-3">
            {this.props.admin ?
                <div className="card-control card-control-shadowed">
                    <div className="mb-2">
                        <i className="fa fa-edit"
                           onClick={this.handleEdit}>
                        </i>
                    </div>
                    <div>
                        <i className="fa fa-trash-alt"
                           onClick={this.handleDelete}>
                        </i>
                    </div>
                </div>
                : ""
            }
            <a onClick={this.handleClick}>
                <div className="card-body">
                    <img className="rounded-circle card-image" src={this.props.image}/>
                </div>
                <div className="card-header text-primary">
                    <strong>{this.props.name}</strong>
                </div>
            </a>
        </div>
    }
}