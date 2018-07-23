import React, {Component} from "react";

export default class InterviewsInterviewees extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.list ?
            {interviewees: this.props.list} :
            {interviewees: null}
    }

    render() {
        return <fieldset>
            <legend><strong>Interviewees</strong></legend>
            <div className="container-fluid pl-4">

                <div className="search-block form-inline">
                        <div className="form-group">
                            <i className="fa fa-user-plus padded-left-2x fa-2x pt-2" style={{position:"absolute"}}></i>
                            <input className="form-control padded-left-9x" title="search interviewees" placeholder="Search interviewees"/>
                        </div>
                </div>

                <div className="row align-content-center text-center">
                    <div className="card card-clear card-hover-effect" data-target="#form-add-interviewee"
                         data-toggle="modal">
                        <div className="card-body">
                            <i className="fa fa-8x fa-user-plus"></i>
                        </div>
                        <div className="card-footer">
                            <div className="figure-caption shifted-left">Add New</div>
                        </div>
                    </div>
                    {
                        this.state.interviewees.map((interviewee) =>
                            <div className="card card-clear card-hover-effect">
                                <div className="card-control">
                                    <div className="mb-2" data-target="#form-add-interviewee" data-toggle="modal"><i
                                        className="fa fa-edit"></i></div>
                                    <div><i className="fa fa-minus-square"></i></div>
                                </div>
                                <div className="card-body">
                                    <img className="rounded-circle card-image" src={interviewee.profile_image}/>
                                </div>
                                <div className="card-footer">
                                    {interviewee.name}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </fieldset>
    }

}