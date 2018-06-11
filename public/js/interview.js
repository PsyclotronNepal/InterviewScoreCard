class InterviewCard extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return <div className="card card-hover-effect mb-3">
            {this.props.admin ?
                <div className="card-control card-control-shadowed">
                    <div className="mb-2"><i className="fa fa-edit" onClick={this.props.onEdit ? this.props.onEdit : function () {}}></i></div>
                    <div><i className="fa fa-trash-alt" onClick={this.props.onDelete ? this.props.onDelete : function () {}}></i></div>
                </div>
                :""
            }

            <a onClick={this.props.onClick?this.props.onClick:function(){}}>
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
            if(this.props.interviews.length) {
                const interviews = this.props.interviews
                if(this.props.admin) {
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
                else{
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
