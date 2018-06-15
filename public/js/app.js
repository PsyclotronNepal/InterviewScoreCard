
class App extends React.Component {
    constructor(props) {
        super(props)
        // the app should initialize the toaster first.
        toastr.options.positionClass = 'toast-bottom-full-width';
        toastr.options.extendedTimeOut = 1000;
        toastr.options.timeOut = 5000;
        toastr.options.fadeOut = 250;
        toastr.options.fadeIn = 250;

        this.state = {
            renderer: null,
            user: {loggedin: false}
        }
        if(pageUser().loggedin){
            this.state.current_page=<Interviews />;
        }
        else{
            this.state.current_page=<Login />;

        }
    }

    componentDidMount() {
        appInstance=this;
    }

    render() {
        return this.state.current_page;
    }
    changeRenderer(renderer) {
        this.setState({current_page: renderer})
    }
}


class Header extends React.Component {
  logoutUser(){

    console.log("logout clicked");
    window.location='/api/user/logout'
  }
    render() {
        if (this.props.user.loggedin) {
            return <div className="row" id="header">
                <div className="col-2 align-content-center text-center">
                    <img className="rounded-circle" id="profile-image" src={this.props.user.profile_image}/>
                    <br/>
                    <div id="user-name">{this.props.user.first_name}</div>
                </div>

                <div className="col-10" id="header-website-info">
                    <h1>LIS NEPAL</h1>
                    <h1 className="text-capitalize text-right h1" id="  header-website-text">Interview Assistant</h1>
                    <a href="#" onClick={this.logoutUser} >
                    <div className="text-danger" id="option-logout">
                        Logout &nbsp;
                        <i className="fa fa-eject"></i>
                    </div>
                    </a>
                </div>
            </div>
        }
        else {
            return <div className="row" id="header">
                <div className="col-12" id="header-website-info">

                    <img className='logoimage' src='/images/lis logo.gif'/>
                    <h1 className="text-capitalize text-right h1" id="header-website-text">Interview Assistant</h1>
                </div>
            </div>
        }

    }
}

class Navigation extends React.Component {

    render() {
        return <nav className="col-lg-2 col-sm-3 " id="navbar">
            <div id="nav-content">
                <div className="nav-item active text-center"><span>
                    <i className="fa fa-map-marker"></i> Interviews</span>
                </div>
                <a href="interviewer-list.html">
                    <div className="nav-item text-center"><span>
                        <i className="fa fa-map-marker"></i> Interviewers</span>
                    </div>
                </a>
                <a href="admin-list.html">
                    <div className="nav-item text-center"><span><i className="fa fa-map-marker"></i> Admin</span>
                    </div>
                </a>
            </div>
        </nav>
    }
}

class Body extends React.Component {
    render() {
        return <div className="col-lg-10 col-sm-9 container-fluid" id="content">
            {this.props.children}
        </div>
    }
}

class Search extends React.Component {

    render() {
        return <div className="row">
            <div className="col-4">
                <div className="form-group">
                    <input type="search" onChange={this.props.onChange?this.props.onChange:function(){}} className="form-control search-input"
                           placeholder={this.props.placeholder}/>
                    <i className="fa fa-search search-button "></i>
                </div>
            </div>
        </div>
    }
}

class Page extends React.Component {

    render() {
        if (this.props.user.loggedin) {
            return <div className="p-0">
                <Header user={this.props.user}/>
                <div className="container-fluid" id="body-content">
                    <div className="row">
                        <Navigation user={this.props.user}/>
                        {this.props.children}
                    </div>
                </div>
            </div>
        }
        else {
            return <div className="p-0">
                <Header user={this.props.user}/>
                <div className="row">
                    {this.props.children}
                </div>
            </div>

        }

    }
}

class BodyHeader extends React.Component{
    render(){
        return <div className="row h1 text-center text-uppercase">
           <div id="content-header" className="col-md-12">
                {this.props.value}
               <hr id="header-separtion-line"/>
            </div>
        </div>
    }
}