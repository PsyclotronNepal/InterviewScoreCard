import React, {Component} from "react";
import Select from 'react-select';
import * as toastr from "toastr";
import axios from "axios/index";
import {setPage} from "../Base";


export default class InterViewsInterviewersCard extends Component {

    constructor(props) {
        super(props);
        this.handleInterviewerRemove = this.handleInterviewerRemove.bind(this);
        this.state={
            selected_criteria: this.props.interviewer.pivot.evaluation_id
        }
        this.handleChange= this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    handleInterviewerRemove(){
        this.props.handleRemove(this.props.interviewer.id);
    }

    handleChange(event){
        var old_selected_criteria = this.state.selected_criteria;
        console.log(event.target.value);
        this.setState({
            selected_criteria:event.target.value
        })

        axios.post('/api/interview/interviewer/changeEvaluation', {
            interview_id: this.props.interview,
            interviewer_id: this.props.interviewer.id,
            evaluation_id: old_selected_criteria,
            new_evaluation_id: event.target.value

        }).then(response => {
            if(!response.data.error){
                toastr['success']("Interviewer evaluation criteria has been change", "Success");}}
        ).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors, "Interviewer Error Updating Change [code: " + errors.status + "]");
        })

        // this.props.evaluationChange(this.props.interviewer.id, event.target.value);
    }


    render() {
        return <div className="card card-clear card-hover-effect">
            <div className="card-control">
                <div onClick={this.handleInterviewerRemove}><i
                    className="fa fa-minus-square"></i>
                </div>
            </div>
            <div className="card-body">
                <img className="rounded-circle card-image" src={this.props.interviewer.profile_image}/>
            </div>
            <div className="card-footer">
                <div>{this.props.interviewer.first_name}</div>
                <div className="mt-2">{
                    this.props.criterias ?
                        <select className="form-control" title="select evaluation criteria" value={this.state.selected_criteria} onChange={this.handleChange}>
                            {
                                this.props.criterias.map((criteria) =>
                                    <option value={criteria.id}> {criteria.title}</option>
                                )
                            }
                        </select> :
                        <select className="form-control" title="select evaluation criteria">
                            {
                                <option>Criterias undefined</option>
                            }
                        </select>
                }
                </div>
            </div>
        </div>

    }
}