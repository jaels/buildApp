var React = require('react');
var {Link, IndexLink} = require('react-router');


class ChatNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            connected:{}
        }
        this.componentDidMount = this.componentDidMount.bind(this);

        var that = this;
        axios.get('/getAllUsers').then(function(result) {
            that.setState({
                users:result.data.file
            })
        })
        axios.get('/whosConnected').then(function(result) {
            console.log('who is connected when entering')
            console.log(result);
            that.setState({
                connected:result.data.file
            })
        })
    }
    componentDidMount() {
        var that=this;
        socket.on('hey', function(connected) {
            console.log('hey - what the newest users from server?')
            console.log(connected);
            that.setState({
                connected:connected
            })
            console.log('whats the state?')
            console.log(that.state.connected);
            // var hey = user.id.toString();
        });
        socket.on('bye', function(connected) {
            console.log('bye- what the newest users from server?')
            console.log(connected);
            that.setState({
                connected:connected
            })
            console.log('whats the state?')
            console.log(that.state.connected);
            // var hey = user.id.toString();
        });

}
    render() {
        var that = this;
        var { gotAllUsers, users } = this.state;
        var details = this.props.details;
        var address = this.props.details.address;

                var users = that.state.users.map(function(user) {
                    var chatUrl = [that.props.details.user.id,user.id].sort(function(a,b) {
                        return (a-b);
                    }).join('_');
                function checkConnected() {
                    if(that.state.connected[user.id.toString()]) {
                            return (
                                <div className="fullUsersCircle"></div>
                            )
                    }
                    else {
                        return (
                            <div className="emptyUsersCircle"></div>

                        )
                    }
                }

                    return (
                        <div className="nameAndCircle">
                            {checkConnected()}
                            <IndexLink to={`/connectArea/${chatUrl}`} activeClassName="active" id={user.id}> <p className="nav-text">{user.firstname } {user.lastname}</p></IndexLink>
                        </div>

                    )
                })

        return (
            <div className="chatNav">
                <img className="logo-main" id="logoChat" src="logo_small.png"/>
                    <div className="channelsNames">
                        <p className="invite-text" id="youChat">#{this.props.details.user.firstname } {this.props.details.user.lastname} (you)</p>
                <IndexLink to="/connectArea" activeClassName="active"><p className="nav-text" id="generalChat">GENERAL</p></IndexLink>
                <h3 className="invite-text">Send a private message:</h3>
                    <div className="usersArea">

                        {users}
                    </div>
                        <h3 className="invite-text" id="invite">+ invite your neighbours</h3>
                    </div>
            </div>
        )
    }

}




module.exports = ChatNav;
