import React, {Component} from "react";
import Page from "./Page";
import {changeUser, pageUser, setPage} from '../Base';
import Body from "./Body";
import EventDetail from "./EventDetail";
import EvaluationCriteria from "./EvaluationCriteria";
import InterViewsInterviewers from "./InterViewsInterviewers";
import InterviewsInterviewees from "./InterviewsInterviewees";


export default class InterviewView extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.data;
    }

    componentDidMount() {

    }

    render() {
        return <Page user={pageUser()}>
            <Body>
            <div id="content-detail" className="row container-fluid align-left">
                <form className="match-parent">
                    <EventDetail data-interview={this.state.id} date={this.state.date} location={this.state.location}
                                 title={this.state.title}/>
                    <EvaluationCriteria data-interview={this.state.id} list={this.state.evaluation_criteria}/>
                    <InterViewsInterviewers data-interview={this.state.id} list={this.state.interviewers}/>
                    <InterviewsInterviewees data-interview={this.state.id} list={this.state.interviewees}/>
                </form>
            </div>
            </Body>
        </Page>

    }
}