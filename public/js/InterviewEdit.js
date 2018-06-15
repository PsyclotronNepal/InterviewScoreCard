
class InterviewView extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.data;
    }

    componentDidMount() {

    }

    render() {
        return <Page user={pageUser()}>
            <Body>
            <div id="content-detail" className="row container-fluid align-left">
                <form className="match-parent">
                    <EventDetail data-interview={this.state.id} date={this.state.date} location={this.state.location}
                                 title={this.state.title}/>
                    <EvaluationCriteria data-interview={this.state.id} list={this.state.evaluation_criteria}/>
                    <Interviewers data-interview={this.state.id} list={this.state.interviewers}/>
                    <Interviewees data-interview={this.state.id} list={this.state.interviewees}/>
                </form>
            </div>
            </Body>
        </Page>

    }
}



class TableData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: this.props.children};
        this.changeHandler = this.props.onChange ?
            this.props.onChange :
            function () {
            };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        if (event.target.innerHTML != this.state.content) {
            let current = this;
            $.ajax({
                dataType: "json",
                url: '/api/evaluation_criteria/edit',
                method: "post",
                data: {
                    evaluation_id: event.target.parentNode.getAttribute('data-id'),
                    field_name: current.props.fieldName,
                    value: event.target.innerHTML.trim()
                },
                success: function (response) {
                    if (response.error) {
                        toastr['warning'](response.message, "Error");
                        current.node.innerHTML = current.state.content;
                    } else {
                        current.setState({content: current.node.innerHTML});
                    }
                },
                error: function (err) {
                    current.node.innerHTML = current.state.content;
                    toastr['error'](" Message: " + err.responseJSON.message, "Error while updating changes " + err.status + "]");
                }
            })
        }
    }

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        this.node.innerHTML = this.state.content;
    }

    render() {
        return <td contentEditable={true} onKeyUp={this.handleChange}></td>
    }
}

class EventDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

class CriteriaRow extends React.Component {
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

class EvaluationCriteria extends React.Component {
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

class Interviewers extends React.Component {

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
                <div className="row search-block input-group">
                    <div className="form-group col-auto form-inline">
                        <i className="fa fa-search" style={{position: "absolute", left: 16 + "pt"}}></i>
                        <input className="form-control padded-left-6x" title="search interviewers"/>
                        <i className="fa fa-user-plus padded-left-2x"></i>
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

class Interviewees extends React.Component {
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

