
var React = require('react');

var Logo = React.createClass({
    render: function() {
        return(
            <div id='logoContainer'>
            <h1 id="mainHeadline">Neighbours</h1>
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
