import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';
import InterviewerCard from "./InterviewerCard";
import UserCreateCard from "./UserCreateCard";


export default class InterviewerList extends Component {
    constructor(props) {
        super(props);
        let interviewers = []
        if (this.props.interviewers) {
            interviewers = this.props.interviews;
        }
        this.state = {interviewers: interviewers}
    }

    render() {
        if (this.props.interviewers) {
            if (this.props.interviewers.length) {
                const interviewers = this.props.interviewers
                if (this.props.admin) {
                    return <div className="row align-items-center text-center">
                            <UserCreateCard/>{
                            interviewers.map((interviewer) =>
                                <InterviewerCard key={interviewer.id} image={interviewer.profile_image} name={interviewer.first_name + " " + interviewer.middle_name + " " + interviewer.last_name} data-id={interviewer.id} admin
                                />)}
                    </div>
                }
                else {
                    return <div className="row align-items-center text-center">
                        {
                            interviewers.map((interviewer) =>
                                <InterviewerCard key={interviewer.id} image={interviewer.profile_image} name={interviewer.first_name + " " + interviewer.middle_name + " " + interviewer.last_name}
                                />)
                        }
                    </div>
                }
            }
        }
        if(this.props.admin){
            return <UserCreateCard/>
        }
        else {
            return <div className="row align-items-center text-center">
                <h4 className="text-center col-12 text-muted">This place is empty</h4>
            </div>
        }

    }
}