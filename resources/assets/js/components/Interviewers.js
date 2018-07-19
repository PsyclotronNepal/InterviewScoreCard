import React, {Component} from 'react';
import * as toastr from 'toastr';
import axios from 'axios';
import {changeUser, pageUser, setPage} from '../Base';
import Page from "./Page";
import Body from "./Body";
import Search from "./Search";
import InterviewerList from "./InterviewerList";



export default class Interviewers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            interviewers: []

        }

        // you need to bind this if the function doesn't come default to component and you need to access state
        this.handleSearch = this.handleSearch.bind(this,)

        // this.handleInterviewClick = this.handleInterviewClick.bind(this);

    }

    componentDidMount() {
        axios.get('/api/interviewer').then(response=>{
            this.setState({
                interviewers: response.data
            });
        }).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors.responseJSON.message, "Interview Fetch Error [code: " + errors.status + "]");
        })
    }

    render() {
        var interviewers = this.state.interviewers;

        if(this.props.interviewers){
            interviewers = this.props.interviewers;
        }

        return <Page user={pageUser()}>
            <Body>
            <Search onChange={this.handleSearch}/>
            {$.inArray(pageUser().roles, "admin") ?
                <InterviewerList interviewers={interviewers}
                               onClick={this.handleInterviewClick}
                               onDelete={this.handleInterviewDelete}
                               admin/> :

                <InterviewerList interviewers={interviewers}
                               onClick={this.handleInterviewClick}
                />
            }
            </Body>
        </Page>
    }

    handleSearch($event) {
        axios.get('/api/interviewer',{
            params: {
                term: $event.target.value
            }
        }).then(response=>{
            setPage(<Interviewers interviewers = {response.data}/>)}
        ).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors.responseJSON.message, "Interviewer Fetch Error [code: " + errors.status + "]");
        })
    }

    handleInterviewersEdit() {

    }

    handleInterviewersDelete() {

    }

    handleInterviewersClick() {

    }
}








