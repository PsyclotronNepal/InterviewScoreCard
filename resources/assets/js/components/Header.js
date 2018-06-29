import React, {Component} from 'react';

export default class Header extends Component {
    logoutUser(){

        console.log("logout clicked");
        window.location='/api/user/logout'
    }
    render() {
        if (this.props.user.loggedin) {
            return <div className="row" id="header">
                <div className="col-2 align-content-center text-center">
                    <img className="rounded-circle" id="profile-image" src={this.props.user.profile_image}/>
                    <br/>
                    <div id="user-name">{this.props.user.first_name}</div>
                </div>

                <div className="col-10" id="header-website-info">
                    <h1>LIS NEPAL</h1>
                    <h1 className="text-capitalize text-right h1" id="  header-website-text">Interview Assistant</h1>
                    <a href="#" onClick={this.logoutUser} >
                        <div className="text-danger" id="option-logout">
                            Logout &nbsp;
                            <i className="fa fa-eject"></i>
                        </div>
                    </a>
                </div>
            </div>
        }
        else {
            return <div className="row" id="header">
                <div className="col-12" id="header-website-info">

                    <img className='logoimage' src='/images/lis logo.gif'/>
                    <h1 className="text-capitalize text-right h1" id="header-website-text">Interview Assistant</h1>
                </div>
            </div>
        }

    }
}










