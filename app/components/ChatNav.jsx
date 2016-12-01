var React = require('react');
var {Link} = require('react-router');


class ChatNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gotAllusers: false
        }
        var that = this;
        axios.get('/getAllUsers').then(function(result) {
            console.log(result);
            that.state = {
                users:result.data.file,
                gotAllUsers: true
            }
            console.log(that.state.users);
            return;
        })
    }
    render() {
        var that = this;
        var { gotAllUsers, users } = this.state;

        function gotUsers() {
            if(gotAllUsers) {
                var users = that.state.users.map(function(user) {
                    return (
                        <Link to={`/chatWithUser/${user.id}`} activeClassName="active"> <p>{user.firstname } {user.lastname}</p></Link>
                )
            })
            return (
                <div>
                    {users}
                </div>
            )
        }
    }
    var details = this.props.details;
    var address = this.props.details.address;
    return (
        <div className="chatNav">
            <h3> {address}</h3>
        <Link to="/connectArea" activeClassName="active">General</Link>
    <Link to="/anotherChat">another</Link>

    {gotUsers()}
</div>
)
}

}





module.exports = ChatNav;
