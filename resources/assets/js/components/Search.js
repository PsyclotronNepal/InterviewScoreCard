import React, {Component} from "react";
import * as toastr from 'toastr';
require('../Base');
export default class Search extends Component {

    render() {
        return <div className="row">
            <div className="col-4">
                <div className="form-group">
                    <input type="search" onChange={this.props.onChange ? this.props.onChange : function () {
                    }} className="form-control search-input"
                           placeholder={this.props.placeholder}/>
                    <i className="fa fa-search search-button "></i>
                </div>
            </div>
        </div>
    }
}