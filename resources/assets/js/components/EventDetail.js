import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';

export default class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: this.props.title,
            date: this.props.date,
            location: this.props.location
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleLocationChange = this.handleDateChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.submitChange = this.submitChange.bind(this);
    }

    render() {
        return <fieldset>
            <legend><strong>Event Detail</strong></legend>
            <div className="container-fluid">
                <div className="form-group form-row ">
                    <label className="col-3">Title</label>
                    <input className="col-9 form-control" placeholder="Interview Title"
                           onChange={this.handleTitleChange}
                           value={this.state.title}/>
                </div>
                <div className="form-group form-row">
                    <label className="col-3">Date</label>
                    <input className="col-9 form-control" type="date" placeholder="Choose date"
                           onChange={this.handleDateChange}
                           value={this.state.date}/>
                </div>
                <div className="form-group form-row">
                    <label className="col-3">Location</label>
                    <input className="col-9 form-control" placeholder=" Interview Location"
                           onChange={this.handleLocationChange}
                           value={this.state.location}/>
                </div>
            </div>
        </fieldset>
    }

    handleTitleChange(event) {
        this.submitChange("title", event.target.value);
    }

    handleLocationChange() {
        this.submitChange("location", event.target.value);
    }

    handleDateChange() {
        this.submitChange("date", event.target.value);
    }

    submitChange(key, value) {
        var current = this;
        $.ajax({
                dataType: "json",
                url: "/api/interview/" + current.props['data-interview'] + "/edit",
                method: "post",
                data: {
                    "field_name": key,

                    "value": value
                },
                success: function (response) {
                    if (response.error) {
                        toastr['warning'](response.message, "Error");
                    }
                    else {
                        current.setState({key: event.target.value});
                    }
                },
                error: function (err) {
                    toastr['error'](" Message: " + err.responseJSON.message, "Error while updating changes " + err.status + "]");
                }
            }
        )
    }


}