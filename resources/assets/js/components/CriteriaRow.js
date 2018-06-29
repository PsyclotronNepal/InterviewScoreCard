import React, { Component } from "react";
import {changeUser, pageUser, setPage} from '../Base';
import TableData from "./TableData";

export default class CriteriaRow extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.data;
    }

    render() {
        return <tr data-id={this.state.id}>
            <th className="hover-show-delete">
                <i className="fa fa-trash-alt" data-id={this.state.id}
                   onClick={this.props.onDelete ? this.props.onDelete : function () {
                   }}></i>
                <p>{this.props.counter}</p>
            </th>
            <TableData fieldName="title">{this.state.title}</TableData>
            <TableData fieldName="weight">{this.state.weight}</TableData>
            <TableData fieldName="remarks">{this.state.remarks}</TableData>
        </tr>
    }
}