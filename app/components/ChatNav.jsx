var React = require('react');
var {Link, IndexLink} = require('react-router');


class ChatNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);

        var that = this;
        axios.get('/getAllUsers').then(function(result) {
            that.setState({
                users:result.data.file
            })
        })
    }
    componentDidMount() {
        socket.on('hey', function(user) {
            console.log('hey yoooo')
            console.log(user);
            var hey = user.id.toString();
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
                    return (
                        <div>
                            <div className="usersCircle"></div>
                            <div className="usersChat">
                            <Link to={`/connectArea/${chatUrl}`} activeClassName="active" id={user.id}> <p className="nav-text">{user.firstname } {user.lastname}</p></Link>
                            </div>
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
                        {users}
                        <h3 className="invite-text" id="invite">+ invite your neighbours</h3>
                    </div>
            </div>
        )
    }

}




module.exports = ChatNav;
