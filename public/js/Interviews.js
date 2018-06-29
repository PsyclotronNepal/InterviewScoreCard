class Interviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            interviews: []

        }
        this.handleSearch = this.handleSearch.bind(this,)
        this.handleInterviewClick=this.handleInterviewClick.bind(this);

    }

    componentDidMount() {
        let home = this;
        $.ajax({
            dataType: "json",
            url: "/api/interview",
            success: function (result) {

                if (result.error) {
                    toastr['warning'](" Message: " + result.message, "Interview Fetch Error");
                }
                else {
                    home.setState({interviews: result});
                }
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Interview Fetch Error [code: " + err.status + "]");
            }
        });
    }

    render() {
        const interviews = this.state.interviews.data;
        return <Page user={pageUser()}>
            <Body>
            <Search onChange={this.handleSearch}/>
            {$.inArray(pageUser().roles, "admin") ?
                <InterviewList interviews={interviews}
                               onClick={this.handleInterviewClick}
                               onDelete={this.handleInterviewDelete}
                               admin/> :

                <InterviewList interviews={interviews}
                               onClick={this.handleInterviewClick}
                />
            }

            </Body>
        </Page>

    }

    handleSearch($event) {
        let home = this;
        $.ajax({
            dataType: "json",
            url: "/api/interview",
            data: {term: $event.target.value},
            success: function (result) {
                if (result.error) {
                    toastr['warning'](" Message: " + result.message, "Interview Search Error");
                }
                else {
                    home.setState({interviews: result});
                }
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Interview Search Error [code: " + err.status + "]");
            }
        });
    }

    handleInterviewEdit() {

    }

    handleInterviewDelete() {

    }

    handleInterviewClick() {

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
                                               data-id={interview.id}
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



class InterviewCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleClick(event) {
        if(this.props.onClick){
            this.props.onClick({target:event.target,key:this.props['data-id']});
        }
    }

    handleDelete(event) {
        if (this.props.onDelete) {
            this.props.onDelete({target:event.target,key:this.props["data-id"]});
        }
    }

    handleEdit(event) {
        $.ajax({
            dataType: 'json',
            url: '/api/interview/' + this.props['data-id'],
            success: function (response) {
                setPage(<InterviewView data={response}/>)
            },
            error: function (err) {
                toastr['error'](" Message: " + err.responseJSON.message, "Interview Detail fetch Error [code: " + err.status + "]");
            }
        })

        if (this.props.onEdit) {
            this.props.onEdit({target:event.target,key:this.props["data-id"]});
        }
    }

    render() {
        return <div className="card card-hover-effect mb-3">
            {this.props.admin ?
                <div className="card-control card-control-shadowed">
                    <div className="mb-2">
                        <i className="fa fa-edit"
                           onClick={this.handleEdit}>
                        </i>
                    </div>
                    <div>
                        <i className="fa fa-trash-alt"
                           onClick={this.handleDelete}>
                        </i>
                    </div>
                </div>
                : ""
            }
            <a onClick={this.handleClick}>
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


