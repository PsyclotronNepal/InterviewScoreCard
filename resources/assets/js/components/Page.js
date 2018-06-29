import React, {Component} from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import * as toastr from 'toastr';
require('../Base');

export default class Page extends Component {

    render() {
        if (this.props.user.loggedin) {
            return <div className="p-0">
                <Header user={this.props.user}/>
                <div className="container-fluid" id="body-content">
                    <div className="row">
                        <Navigation user={this.props.user}/>
                        {this.props.children}
                    </div>
                </div>
            </div>
        }
        else {
            return <div className="p-0">
                <Header user={this.props.user}/>
                <div className="row">
                    {this.props.children}
                </div>
            </div>

        }

    }
}