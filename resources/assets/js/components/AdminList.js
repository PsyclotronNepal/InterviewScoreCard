import React, {Component} from "react";
import * as toastr from 'toastr';
import {changeUser, pageUser, setPage} from '../Base';
import AdminCard from "./AdminCard";
import UserCreateCard from "./UserCreateCard";

export default class AdminList extends Component {
    constructor(props) {
        super(props);
        let admins = []
        if (this.props.admins) {
            admins = this.props.interviews;
        }
        this.state = {admins: admins}
    }

    render() {
        if (this.props.admins) {
            if (this.props.admins.length) {
                const admins = this.props.admins
                if (this.props.admin) {
                    return <div className="row align-items-center text-center">
                        <UserCreateCard admin/>
                        {
                            admins.map((admin) =>
                                <AdminCard key={admin.id} image={admin.profile_image} name={admin.first_name + " " + admin.middle_name + " " + admin.last_name} data-id={admin.id} admin
                                />)
                        }
                    </div>
                }
                else {
                    return <div className="row align-items-center text-center">
                        {
                            admins.map((admin) =>
                                <AdminCard key={admin.id} image={admin.profile_image} name={admin.first_name + " " + admin.middle_name + " " + admin.last_name} data-id={admin.id}
                                />)
                        }
                    </div>
                }
            }
        }
        if(this.props.admin){
            return <UserCreateCard admin/>
        }
        else {
            return <div className="row align-items-center text-center">
                <h4 className="text-center col-12 text-muted">This place is empty</h4>
            </div>
        }

    }
}