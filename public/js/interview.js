class InterviewCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="card card-hover-effect mb-3">
            {this.props.admin ?
                <div className="card-control card-control-shadowed">
                    <div className="mb-2">
                        <i className="fa fa-edit"
                           onClick={this.props.onEdit ? this.props.onEdit : function () {
                           }}>

                        </i>
                    </div>
                    <div>
                        <i className="fa fa-trash-alt"
                           onClick={this.props.onDelete ? this.props.onDelete : function () {
                           }}>

                        </i>
                    </div>
                </div>
                : ""
            }

            <a onClick={this.props.onClick ? this.props.onClick : function () {
            }}>
                <div className="card-header text-primary">
                    <strong>{this.props.name}</strong>
                </div>

                <div className="card-body text-info">
                    <div className="card-subtitle"><i className="fa fa-4x fa-calendar"></i></div>
                    {this.props.date}
                </div>
                <div className="card-footer">
                    {this.props.location}
                </div>
            </a>
        </div>
    }
}


class InterviewList extends React.Component {
    constructor(props) {
        super(props)
        let interviews = []
        if (this.props.interviews) {
            interviews = this.props.interviews;
        }
        this.state = {interviews: interviews}
    }

    render() {
        if (this.props.interviews) {
            if (this.props.interviews.length) {
                const interviews = this.props.interviews
                if (this.props.admin) {
                    return <div className="row align-items-center text-center">
                        {
                            interviews.map((interview) =>
                                <InterviewCard key={interview.id} name={interview.title} location={interview.location}
                                               date={interview.date}
                                               onClick={this.props.onClick} onEdit={this.props.onEdit}
                                               onDelete={this.props.onDelete}
                                               admin

                                />)
                        }
                    </div>
                }
                else {
                    return <div className="row align-items-center text-center">
                        {
                            interviews.map((interview) =>
                                <InterviewCard key={interview.id} name={interview.title} location={interview.location}
                                               date={interview.date}
                                               onClick={this.props.onClick} onEdit={this.props.onEdit}
                                               onDelete={this.props.onDelete}
                                />)
                        }
                    </div>
                }
            }
        }
        return <div className="row align-items-center text-center">
            <h4 className="text-center col-12 text-muted">This place is empty</h4>
        </div>

    }
}

class EventDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            date: this.props.date,
            location: this.props.location
        }
    }

    render() {
        return <fieldset>
            <legend><strong>Event Detail</strong></legend>
            <div className="container-fluid">
                <div className="form-group form-row ">
                    <label className="col-3">{this.state.title}</label>
                    <input className="col-9 form-control" placeholder="Interview Title"
                           onChange={this.handleTitleChange}/>
                </div>
                <div className="form-group form-row">
                    <label className="col-3">{this.state.date}</label>
                    <input className="col-9 form-control" type="date" placeholder="Choose date"
                           onChange={this.handleDateChange}/>
                </div>
                <div className="form-group form-row">
                    <label className="col-3">{this.state.location}</label>
                    <input className="col-9 form-control" placeholder=" Interview Location"
                           onChange={this.handleLocationChange}/>
                </div>
            </div>
        </fieldset>
    }

    handletitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleLocationChange() {
        this.setState({location: event.target.value});
    }

    handleDateChange() {
        this.setState({date: event.target.value});
    }
}

class EvaluationCriteria extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.list ?
            {criteria: this.props.list} :
            {criteria: []}
    }

    componentDidMount() {

    }

    render() {

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
                            <tr key={criteria.id}>
                                <th>-</th>
                                <td>{criteria.title}</td>
                                <td>{criteria.weight}</td>
                                <td>{criteria.remark}</td>
                            </tr>
                        )
                    }

                    <tr onClick={this.handleNewCriteria}>
                        <th>2</th>
                        <td colSpan="3" className="text-center"><i className="fa fa-plus-square"></i> &nbsp;Add new
                            Criteria
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </fieldset>
    }

    handleNewCriteria() {

    }
}

class Interviewers extends React.Component {

    constructor(props) {
        super(props)
        this.state =
            this.props.list ?
                {interviewers: this.props.list} :
                {interviewers: {data: null}}

    }

    componentDidMount() {

    }

    render() {
        return <fieldset>
            <legend><strong>Interviewers</strong></legend>
            <div className="container-fluid pl-4">
                <div className="row search-block input-group">
                    <div className="form-group col-auto form-inline">
                        <i className="fa fa-search" style={{position: "absolute", left: 16 + "pt"}}></i>
                        <input className="form-control padded-left-6x" title="search interviewers"/>
                        <i className="fa fa-user-plus padded-left-2x"></i>
                    </div>
                </div>


                <div className="row text-center">
                    {
                        this.state.interviewers.data ?
                            this.state.interviewers.data.map((interviewer) =>
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

class Interviewees extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.list ?
            {interviewees: this.props.list} :
            {interviewees: {data: []}}
    }

    render() {
        return <fieldset>
            <legend><strong>Interviewees</strong></legend>
            <div className="container-fluid pl-4">

                <div className="row search-block input-group ">
                    <div className="form-group col-auto form-inline">
                        <i className="fa fa-search " style={{position: "absolute", left: 16 + "pt"}}></i>
                        <input className="form-control padded-left-6x" title="search interviewees"/>
                        <i className="fa fa-user-plus padded-left-2x"></i>
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
                        this.state.interviewees.data.map((interviewee) =>
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

class InterviewView extends React.Component {
    constructor() {
        super()
        this.state={
            title:"",
            locatioin:"",
            date:"",
            interviewers:[],
            interviewees:[]
        }
    }

    componentDidMount() {
        $.ajax({
            dataType: 'json',
            url: '/api/interview/'+this.props.key,
            success: function (response) {
                this.setState( response)
            },
            error: function (response) {
                toastr['error'](" Message: " + err.responseJSON.message, "Interview Detail fetch Error [code: " + err.status + "]");
            }
        })

    }

    render() {
        return <Page user={pageUser()}>
            <Body>
            <div id="content-detail" className="row container-fluid align-left">
                <form className="match-parent">
                    <EventDetail date={this.state.date} location={this.state.location} title={this.state.title}/>
                    <EvaluationCriteria list={this.state.evaluation_criteria}/>
                    <Interviewers list={this.state.interviewers}/>
                    <Interviewees list={this.state.interviewees}/>
                </form>
            </div>
            </Body>
        </Page>
    }
}
