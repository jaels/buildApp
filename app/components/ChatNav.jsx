var React = require('react');
var {Link, IndexLink} = require('react-router');


class ChatNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gotAllUsers: false
        }

        var that = this;
        axios.get('/getAllUsers').then(function(result) {
            that.setState({
                users:result.data.file,
                gotAllUsers: true
            })
            return;
        })
    }
    render() {
        var that = this;
        var { gotAllUsers, users } = this.state;
        var details = this.props.details;
        var address = this.props.details.address;
        function gotUsers() {
            if(that.state.gotAllUsers) {
                var users = that.state.users.map(function(user) {
                    return (
                        <div>
                            <Link to={`/connectArea/privateChat/${user.id}`} activeClassName="active" key={user.id}> <p>{user.firstname } {user.lastname}</p></Link>
                        </div>
                    )
                })
                console.log('after map');

                return (
                    <div>
                        {users}
                    </div>
                )
            }
        }
        return (
            <div className="chatNav">
                <h3> {address}</h3>
                <IndexLink to="connectArea" activeClassName="active">General</IndexLink>
                {gotUsers()}
            </div>
        )
    }

}





module.exports = ChatNav;
