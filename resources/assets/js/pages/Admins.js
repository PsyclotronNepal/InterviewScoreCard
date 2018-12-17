import React, {Component} from 'react';
import * as toastr from 'toastr';
import axios from 'axios';
import {changeUser, pageUser, setPage} from '../Base';
import Page from "../components/Page";
import Body from "../components/Body";
import Search from "../components/Search";
import AdminList from "../components/AdminList";



export default class Admins extends Component {
    constructor(props) {
        super(props)
        this.state = {
            admins: []

        }
        this.handleSearch = this.handleSearch.bind(this,)
        // this.handleInterviewClick = this.handleInterviewClick.bind(this);

    }

    componentDidMount() {
        axios.get('/api/admin').then(response=>{
            this.setState({
                admins: response.data
            });
        }).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors.responseJSON.message, "Interview Fetch Error [code: " + errors.status + "]");
        })

    }

    render() {
        var admins = this.state.admins;


        if(this.props.admins){
            admins = this.props.admins;
        }


        return <Page user={pageUser()}>
            <Body>
            <Search onChange={this.handleSearch}/>
            {$.inArray(pageUser().roles, "admin") ?
                <AdminList admins={admins}
                                 onClick={this.handleInterviewClick}
                                 onDelete={this.handleInterviewDelete}
                                 admin/> :

                <AdminList admins={admins}
                                 onClick={this.handleInterviewClick}
                />
            }
            </Body>
        </Page>
    }

    handleSearch($event) {

        axios.get('/api/admin',{
            params: {
                term: $event.target.value
            }
        }).then(response=>{
            setPage(<Admins admins = {response.data}/>)
        }).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors.responseJSON.message, "Admin Fetch Error [code: " + errors.status + "]");
        });
     }

    handleAdminEdit() {

    }

    handleAdminDelete() {

    }

    handleAdminClick() {

    }
}








