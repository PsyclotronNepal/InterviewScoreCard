import React, {Component} from "react";
import Page from "../components/Page";
import {changeUser, pageUser, setPage} from '../Base';
import Body from "../components/Body";
import Admins from "./Admins";
import * as toastr from "toastr";
import {ajax} from "jquery";


export default class AdminView extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.data;

        this.handleBackClick=this.handleBackClick.bind(this);
        this.handleFNameChange=this.handleFNameChange.bind(this);
        this.handleMNameChange=this.handleMNameChange.bind(this);
        this.handleLNameChange=this.handleLNameChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleEmailChange=this.handleEmailChange.bind(this);
    }

    componentDidMount() {

    }
    handleBackClick(){
        console.log("Clicked back");
        setPage(<Admins />)
    }
    handleSubmit(){
        ajax({
            dataType: "json",
            url: "/api/admin/update",
            method:"post",
            data:this.state,
            success: function (result) {
                if (result.error) {
                    toastr['warning'](" Message: " + result.message, "Interview Fetch Error");
                }
                else {
                    toastr['success']("Data has been updated","Success");
                }
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Interview Fetch Error [code: " + err.status + "]");
            }
        });
    }

    handleMNameChange(event) {
        this.setState({middle_name:event.target.value});
    }

    handleLNameChange(event) {
        this.setState({last_name:event.target.value});
    }

    handleFNameChange(event) {
        this.setState({first_name: event.target.value});
    }
    handleEmailChange(event){
        this.setState({email:event.target.value});
    }

    render() {
        return <Page user={pageUser()}>
            <Body>
            <div className="row h1 content-header text-center text-uppercase">
                <div id="content-header" className="col-md-12">
                    <i className="fa fa-times-circle float-left" onClick={this.handleBackClick}></i>
                    Admin Edit
                    <i className="fa fa-check-circle float-right" onClick={this.handleSubmit}></i>
                </div>
            </div>
            <hr id="header-separtion-line"/>
            <div id="content-detail" className="container-fluid">
                <form id="edit-form" className="pr-5">

                    <div className="form-group row align-content-center">
                        <div className="col-5"></div>
                        <div id="profile-image-upload" className="col-2">
                        <i className="fa fa-user-circle fa-5x"></i>
                        <i className="fa fa-cloud-upload-alt fa-5x"></i>
                        <div className="text-center">Profile Picture</div>
                        <div className="text-center"> Upload File</div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                        <label className="form-text" htmlFor="input-first-name">Full Name</label>
                        <div className="row pl-4">
                            <div className="col">
                            <input type="text" className="form-control " id="input-first-name"
                                   placeholder="First name" value={this.state.first_name} onChange={this.handleFNameChange}/>
                            </div>
                            <div className="col">
                            <input type="text" className="form-control" id="input-middle-name"
                                   placeholder="Middle name" value={this.state.middle_name} onChange={this.handleMNameChange}/>
                            </div>
                            <div className="col">
                            <input type="text" className="form-control " id="input-last-name"
                                   placeholder="Last Name" value={this.state.last_name} onChange={this.handleLNameChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-email">Email address</label>
                        <input type="email" className="form-control ml-4" id="input-email"
                               placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange}/>
                        <small id="emailHelp" className="form-text text-muted shifted-right">
                            Account activation link will be sent tov this email
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-designation">Designation</label><br/>
                        <select className="custom-select form-control ml-4"
                                id="input-designation">
                            <option>Designation 1</option>
                            <option>Designation 2</option>
                        </select>
                    </div>
                    <div>
                        <br/>
                        <button type="submit" className="btn btn-info mr-2">Generate Password</button>
                        <button type="submit" className="btn btn-danger">Deactivate Account</button>
                        <br/>
                    </div>
                </form>
            </div>
            </Body>
        </Page>

    }
}