function homePage() {
    return
}

class Home extends React.Component {
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
                               $onEdit={this.handleInterviewEdit}
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

    handleInterviewClick(event) {

    }
}
