import React, {Component} from "react";

export default class InterViewsInterviewers extends Component {

    constructor(props) {
        super(props)
        this.state =
            this.props.list ?
                {interviewers: this.props.list} :
                {interviewers: null}

    }

    componentDidMount() {

    }

    render() {
        return <fieldset>
            <legend><strong>Interviewers</strong></legend>
            <div className="container-fluid pl-4">
                <div className="search-block form-inline">
                    <div className="form-group">
                        <i className="fa fa-user-plus padded-left-2x fa-2x pt-2" style={{position:"absolute"}}></i>
                        <input className="form-control padded-left-9x" title="search interviewers" placeholder="Search interviewers"/>
                    </div>
                </div>


                <div className="row text-center">
                    {
                        this.state.interviewers ?
                            this.state.interviewers.map((interviewer) =>
                                <div className="card card-clear card-hover-effect">
                                    <div className="card-control">
                                        <div onclick={this.handleInterviewerRemove}><i
                                            className="fa fa-minus-square"></i>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <img className="rounded-circle card-image" src={interviewer.profile_image}/>
                                    </div>
                                    <div className="card-footer">
                                        <div>{interviewer.fname}</div>
                                        <div className="mt-2">
                                            <select className="form-control" title="select evaluation criteria">
                                                {
                                                    this.props.criterias.map((cirteria) =>
                                                        <option value={criteria.id}> Algorithms</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ) :
                            <h4 className="text-center col-12 text-muted">No interviewers assigned yet</h4>
                    }
                </div>
            </div>
        </fieldset>
    }

    handleInterviewerRemove() {

    }
}