import React, {Component} from "react";
import Page from "../components/Page";
import {changeUser, pageUser, setPage} from '../Base';
import Body from "../components/Body";
import EventDetail from "../components/EventDetail";
import EvaluationCriteria from "../components/EvaluationCriteria";
import InterViewsInterviewers from "../components/InterViewsInterviewers";
import InterviewsInterviewees from "../components/InterviewsInterviewees";


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