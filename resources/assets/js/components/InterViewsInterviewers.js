import React, {Component} from "react";
import Select from 'react-select';
import * as toastr from "toastr";
import axios from "axios/index";
import InterViewsInterviewersCard from "./InterViewsInterviewersCard";



export default class InterViewsInterviewers extends Component {

    constructor(props) {
        super(props)
        this.state =
            this.props.list ?
                {interviewers: this.props.list} :
                {interviewers: null};
        this.handleInputChange= this.handleInputChange.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleInterviewerRemove= this.handleInterviewerRemove.bind(this);

    }

    componentDidMount() {
    }

    handleInputChange($event){
        axios.get('/api/interviewer',{
            params:{
                term: $event
            }
        }).then(response=>{
            var list = [];
            response.data.forEach(function(element) {
                list.push({ label: element.first_name +" " +element.middle_name + " " + element.last_name, value: element });
            });
            this.setState({options: list});

        }).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors.responseJSON.message, "Interviewer Fetch Error [code: " + errors.status + "]");
        })

    }

    handleChange(selected){
        if(selected != null) {


            axios.post('/api/interview/interviewer/add', {
                interview_id: this.props['data-interview'],
                interviewer_id: selected.value.id
            }).then(response => {
                if(!response.data.error){
                    var sel = selected.value;
                    sel["pivot"] = []
                    sel["pivot"]["evaluation_id"]= response.data.evaluation_id;
                    console.log(sel);
                    var list = [...this.state.interviewers, sel];
                    this.setState({
                        interviewers: list
                    });
                toastr['success']("Interviewer has been added", "Success");}}
            ).catch(errors => {
                console.log(errors);
                toastr['error'](" Message: " + errors, "Interviewer Error Updating Change [code: " + errors.status + "]");
            })
        }
    }

    render() {
        return <fieldset>
            <legend><strong>Interviewers</strong></legend>
            <div className="container-fluid pl-4">
                <Select isClearable="True" placeholder="Search interviewers" onInputChange={this.handleInputChange} onChange={this.handleChange} options={this.state.options}/>
                <hr/>
                <div className="row text-center">
                    {
                        this.state.interviewers ?
                            this.state.interviewers.map((interviewer) =>
                                <InterViewsInterviewersCard handleRemove={this.handleInterviewerRemove} interview={this.props['data-interview']} interviewer={interviewer} criterias={this.props.criterias}/>
                            ) :
                            <h4 className="text-center col-12 text-muted">No interviewers assigned yet</h4>
                    }
                </div>
            </div>
        </fieldset>
    }

    handleInterviewerRemove(interviewer_id) {

        // check if a interviewer has multiple evaluation id
        // TODO is so
        axios.post('/api/interview/interviewer/delete', {
            interview_id: this.props['data-interview'],
            interviewer_id: interviewer_id
        }).then(response => {
            if(!response.data.error){
                toastr['success']("Interviewer has been removed", "Success");
                var list = [...this.state.interviewers];
                var count;
                list.forEach(function(elem){
                   if(elem.id == interviewer_id){
                       count = list.indexOf(elem);
                   }
                });

                list.splice(count,1);
                this.setState({interviewers: list});

            }}
        ).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors, "Interviewer Remove Failed [code: " + errors.status + "]");
        })

    }
}