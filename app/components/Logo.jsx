
var React = require('react');

var Logo = React.createClass({
    render: function() {
        return(
            <div>
            <button className="logOutButton" onClick={this.logOut}>Logout</button>
            </div>
        )
    },
    logOut: function() {
        axios.get('logOut').then(function(reponse) {
            console.log('logged out');
            window.location.href = "#/loggedOut";

        })
    }
})

module.exports = Logo;
