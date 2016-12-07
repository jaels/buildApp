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
                users:result.data.file,
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
                            <Link to={`/connectArea/${chatUrl}`} activeClassName="active" key={user.id}> <p>{user.firstname } {user.lastname}</p></Link>
                        </div>
                    )
                })

        return (
            <div className="chatNav">
                <h3> {address}</h3>
                <IndexLink to="/connectArea" activeClassName="active">General</IndexLink>
                    <div>
                        {users}
                    </div>
            </div>
        )
    }

}




module.exports = ChatNav;
