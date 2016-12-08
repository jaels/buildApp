var React = require('react');
var {Link, IndexLink} = require('react-router');


class ChatNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

        var that = this;
        axios.get('/getAllUsers').then(function(result) {
            that.setState({
                users:result.data.file
            })
        })
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
                            <IndexLink to={`/connectArea/${chatUrl}`} activeClassName="active" key={user.id}> <p className="nav-text">{user.firstname } {user.lastname}</p></IndexLink>
                        </div>
                    )
                })

        return (
            <div className="chatNav">
                <img className="logo-main" src="logo_small.png"/>
                    <div className="channelsNames">
                <IndexLink to="/connectArea" activeClassName="active"><p className="nav-text">General</p></IndexLink>
                <h3 className="existText">Private Messages</h3>
                        {users}
                    </div>
            </div>
        )
    }

}




module.exports = ChatNav;
