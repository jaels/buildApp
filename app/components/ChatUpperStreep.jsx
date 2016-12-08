
var React = require('react');
var {Link, IndexLink} = require('react-router');

class ChatUpperStreep extends React.Component {
    constructor(props) {
        super(props);
        console.log('streeppppp')
    }

    render() {
        var address = this.props.details.address;
        return (
            <div className="chatUpperStreep">
                <h1>streep</h1>
                <h4>{address}</h4>
                <button className="logOutButton" onClick={this.logOut}>Logout</button>
            </div>
        )
    }
    logOut() {
        axios.get('logOut').then(function(reponse) {
            console.log('logged out');
            window.location.href = "#/loggedOut";

        })
    }
}

module.exports = ChatUpperStreep;
