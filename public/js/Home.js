class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            interviews: []

        }
        this.handleSearch=this.handleSearch.bind(this,)

    }

    componentDidMount() {
        let home = this;
        $.ajax({
            dataType: "json",
            url: "/api/interview",
            success: function (result) {

                if (result.error) {
                    toastr['warning'](" Message: " + result.message,"Interview Fetch Error" );
                }
                else{
                    home.setState({interviews: result});
                }
            },
            error:function(err){
                toastr['error'](" Message: " + err.responseJSON.message,"Interview Fetch Error [code: " + err.status+"]" );
            }
        });
    }

    render() {
        const interviews = this.state.interviews.data;
        return <Body>

        <BodyHeader value="Interviews"/>

        <Search onChange={this.handleSearch}/>
        {this.props.admin ?
            <InterviewList interviews={interviews} admin/> :
            <InterviewList interviews={interviews}/>
        }
        </Body>

    }

    handleSearch($event) {
        let home = this;
        $.ajax({
            dataType: "json",
            url: "/api/interview",
            data: {term:$event.target.value},
            success: function (result) {
                if (result.error) {
                    toastr['warning'](" Message: " + result.message,"Interview Search Error" );
                }
                else{
                    home.setState({interviews: result});
                }
            },
            error:function(err){
                toastr['error'](" Message: " + err.responseJSON.message,"Interview Search Error [code: " + err.status+"]" );
            }
        });
    }
}