import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';
import InterviewView from "./InterviewView";
import axios from "axios/index";
import Interviews from "./Interviews";

export default class InterviewCard extends Component {
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
        $.ajax({
            dataType: 'json',
            url: '/api/interview/delete/' + this.props['data-id'],
            success: function (response) {
                setPage(<Interviews interviews={response}/>);
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Interview Delete Error [code: " + err.status + "]");
            }
        });
    }

    handleEdit(event) {
        $.ajax({
            dataType: 'json',
            url: '/api/interview/' + this.props['data-id'],
            success: function (response) {
                setPage(<InterviewView data={response}/>)
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Interview Detail fetch Error [code: " + err.status + "]");
            }
        });
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
                <div className="card-header text-primary">
                    <strong>{this.props.name}</strong>
                </div>

                <div className="card-body text-info">
                    <div className="card-subtitle"><i className="fa fa-4x fa-calendar"/></div>
                    {this.props.date}
                </div>
                <div className="card-footer">
                    {this.props.location}
                </div>
            </a>
        </div>
    }
}