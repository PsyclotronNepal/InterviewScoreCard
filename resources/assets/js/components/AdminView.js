import React, {Component} from "react";
import Page from "./Page";
import {changeUser, pageUser, setPage} from '../Base';
import Body from "./Body";
import * as toastr from "toastr";
import axios from "axios/index";


export default class AdminView extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.data;


        this.submitChange = this.submitChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleMiddleNameChange = this.handleMiddleNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    componentDidMount() {

    }

    submitChange(key, value) {
        let newState={};
        newState[key]=value;
        if (value != null) {
            this.setState(newState);
        }
        axios.get('/api/admin/' + this.state.id + "/edit", {
            params: {
                "field_name": key,
                "value": value
            }
        }).then(response => {
            }
        ).catch(errors => {
            console.log(errors);
            toastr['error'](" Message: " + errors.responseJSON.message, "Interviewer Error Updating Change [code: " + errors.status + "]");
        })
    }

    render() {
        return <Page user={pageUser()}>
            <Body>
            <div className="row h1 content-header text-center text-uppercase">
                <div id="content-header" className="col-md-12">
                    <i className="fa fa-times-circle float-left"></i>
                    Admin Edit
                    <i className="fa fa-check-circle float-right"></i>
                </div>
            </div>
            <hr id="header-separtion-line"/>
            <div id="content-detail" className="container-fluid">
                <form id="edit-form">
                    <div className="form-group float-right col-md-2" id="profile-image-upload">
                        <i className="fa fa-user-circle fa-5x"></i>
                        <i className="fa fa-cloud-upload-alt fa-5x"></i>
                        <div className="text-center">Profile Picture</div>
                        <div className="text-center"> Upload File</div>


                    </div>
                    <div className="form-group ">
                        <label className="form-text" htmlFor="input-first-name">First Name</label>
                        <input type="text" className="form-control col-sm-6 col-lg-7 shifted-right "
                               id="input-first-name"
                               placeholder="Enter first name"
                               value={this.state.first_name}
                               onChange={this.handleFirstNameChange}></input>
                        <label className="form-text" htmlFor="input-middle-name">Middle Name</label>
                        <input type="text" className="form-control col-sm-6 col-lg-7 shifted-right "
                               id="input-middle-name"
                               placeholder="Enter middle name"
                               value={this.state.middle_name}
                               onChange={this.handleMiddleNameChange}
                        ></input>
                        <label className="form-text" htmlFor="input-last-name">Last Name</label>
                        <input type="text" className="form-control col-sm-6 col-lg-7 shifted-right "
                               id="input-last-name"
                               placeholder="Enter last name"
                               value={this.state.last_name}
                               onChange={this.handleLastNameChange}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-email">Email address</label>
                        <input type="email" className="form-control col-sm-6 col-lg-7 shifted-right" id="input-email"
                               placeholder="Enter email"
                               value={this.state.email}
                               onChange={this.handleEmailChange}></input>
                        <small id="emailHelp" className="form-text text-muted shifted-right">
                            Account activation link will be sent tothisemail
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-designation">Designation</label><br/>
                        <select className="custom-select form-control col-sm-6 col-lg-7 shifted-right"
                                id="input-designation">
                            <option>Designation 1</option>
                            <option>Designation 2</option>
                        </select>
                    </div>
                    <div>
                        <br/>
                        <button type="submit" className="btn btn-info">Generate Password</button>
                        &nbsp;&nbsp;
                        <button type="submit" className="btn btn-danger">Deactivate Account</button>
                        <br/>
                    </div>

                </form>
            </div>
            </Body>

        </Page>

    }

    handleMiddleNameChange(event) {
        this.submitChange("middle_name", event.target.value);
    }

    handleLastNameChange(event) {
        this.submitChange("last_name", event.target.value);
    }

    handleFirstNameChange(event) {
        this.submitChange("first_name", event.target.value);
    }

    handleEmailChange(event){
        this.submitChange("email", event.target.value);
    }
}