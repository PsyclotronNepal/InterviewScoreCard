import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';
import InterviewCard from "./InterviewCard";

export default class InterviewList extends Component {
    constructor(props) {
        super(props);
        let interviews = []
        if (this.props.interviews) {
            interviews = this.props.interviews;
        }
        this.state = {interviews: interviews}
    }

    render() {
        if (this.props.interviews) {
            if (this.props.interviews.length) {
                const interviews = this.props.interviews
                if (this.props.admin) {
                    return <div className="row align-items-center text-center">
                        {
                            interviews.map((interview) =>
                                <InterviewCard key={interview.id} name={interview.title} location={interview.location}
                                               data-id={interview.id}
                                               date={interview.date}
                                               onClick={this.props.onClick} onEdit={this.props.onEdit}
                                               onDelete={this.props.onDelete}
                                               admin

                                />)
                        }
                    </div>
                }
                else {
                    return <div className="row align-items-center text-center">
                        {
                            interviews.map((interview) =>
                                <InterviewCard key={interview.id} name={interview.title} location={interview.location}
                                               date={interview.date}
                                               onClick={this.props.onClick} onEdit={this.props.onEdit}
                                               onDelete={this.props.onDelete}
                                />)
                        }
                    </div>
                }
            }
        }
        return <div className="row align-items-center text-center">
            <h4 className="text-center col-12 text-muted">This place is empty</h4>
        </div>

    }
}