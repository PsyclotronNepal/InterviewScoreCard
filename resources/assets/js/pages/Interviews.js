import React, {Component} from 'react';
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';
import Page from "../components/Page";
import Body from "../components/Body";
import Search from "../components/Search";
import InterviewList from "../components/InterviewList";
import {ajax} from "jquery";


export default class Interviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interviews: []

        };
        this.handleSearch = this.handleSearch.bind(this,);
        this.handleInterviewClick = this.handleInterviewClick.bind(this);

    }

    componentWillMount() {
        let home = this;
        $.ajax({
            dataType: "json",
            url: "/api/interview",
            success: function (result) {

                if (result.error) {
                    toastr['warning'](" Message: " + result.message, "Interview Fetch Error");
                }
                else {
                    home.setState({interviews: result});
                }
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Interview Fetch Error [code: " + err.status + "]");
            }
        });
    }

    render() {
        var interviews = this.state.interviews.data;
        if(this.props.interviews){
            interviews = this.props.interviews.data;
        }

        return <Page user={this.props.user}>
            <Body>
            <Search onChange={this.handleSearch}/>
            {$.inArray(pageUser().roles, "admin") ?
                <InterviewList interviews={interviews}
                               onClick={this.handleInterviewClick}
                               onDelete={this.handleInterviewDelete}
                               admin/> :

                <InterviewList interviews={interviews}
                               onClick={this.handleInterviewClick}
                />
            }

            </Body>
        </Page>

    }

    handleSearch($event) {
        let home = this;
        $.ajax({
            dataType: "json",
            url: "/api/interview",
            data: {term: $event.target.value},
            success: function (result) {
                if (result.error) {
                    toastr['warning'](" Message: " + result.message, "Interview Search Error");
                }
                else {
                    setPage(<Interviews interviews={result}/>)
                }
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Interview Search Error [code: " + err.status + "]");
            }
        });
    }

    handleInterviewEdit() {

    }

    handleInterviewDelete(event) {
        console.log(event.target);

    }

    handleInterviewClick() {

    }
}








