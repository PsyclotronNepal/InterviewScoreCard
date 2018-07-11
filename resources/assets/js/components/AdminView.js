import React, {Component} from "react";
import Page from "./Page";
import {changeUser, pageUser, setPage} from '../Base';
import Body from "./Body";


export default class AdminView extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.data;
    }

    componentDidMount() {

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
                        <label className="form-text" htmlFor="input-name">Full Name</label>
                        <input type="text" className="form-control col-sm-6 col-lg-7 shifted-right " id="input-name"
                               placeholder="Enter full name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-email">Email address</label>
                        <input type="email" className="form-control col-sm-6 col-lg-7 shifted-right" id="input-email"
                               placeholder="Enter email"/>
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
}