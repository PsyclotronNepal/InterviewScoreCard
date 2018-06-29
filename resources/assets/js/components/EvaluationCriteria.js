import React, { Component } from "react";
import * as toastr from "toastr";
import {changeUser, pageUser, setPage} from '../Base';
import CriteriaRow from "./CriteriaRow";

export default class EvaluationCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.list ?
            {criteria: this.props.list} :
            {criteria: []}
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
    }

    handleAdd() {
        let current = this;
        $.ajax({
            dataType: "json",
            url: "/api/evaluation_criteria",
            data: {
                interview_id: this.props['data-interview']
            },
            success: function (reply) {
                if (reply.error) {
                    toastr['warning'](response.message, "Error");
                }
                else {
                    current.setState({
                        criteria: current.state.criteria.concat({
                            id: reply.id,
                            title: "",
                            weight: "",
                            remark: ""
                        })
                    });
                }
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Error while updating changes " + err.status + "]");
            }
        });
    }

    handleDelete(event) {

        let current = this;
        let evaluation_id = parseInt(event.target.getAttribute("data-id"));
        $.ajax({
            dataType: "json",
            url: "/api/evaluation_criteria/delete",
            method: "post",
            data: {
                evaluation_id: evaluation_id
            },
            success: function (reply) {
                if (reply.error) {
                    toastr['warning'](response.message, "Error");
                }
                else {
                    current.setState({
                        criteria: current.state.criteria.filter(function (item) {
                            return item.id !== evaluation_id;
                        })
                    });
                }
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Error while updating changes " + err.status + "]");
            }
        })

    }

    render() {
        let i = 1;
        return <fieldset>
            <legend><strong>Evaluation Criteria</strong></legend>
            <div className="container-fluid pl-4">
                <table className="table table-hover table-responsive-md">
                    <thead>
                    <tr className="thead-light">
                        <th></th>
                        <th>Title (Evaluation Parameter)</th>
                        <th>Weight</th>
                        <th>Remarks</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.criteria.map((criteria) =>
                            <CriteriaRow onDelete={this.handleDelete} key={criteria.id} counter={i++} data={criteria}/>
                        )
                    }
                    <tr onClick={this.handleAdd}>
                        <th>{i}</th>
                        <td colSpan="3" className="text-center"><i className="fa fa-plus-square"></i> &nbsp;Add new
                            Criteria
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </fieldset>
    }
}