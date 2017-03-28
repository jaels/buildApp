
var React = require('react');

var loggedOut = React.createClass({
    render: function() {
        return(
            <div className="logoutContainer">
                <img className="loggedOutLogo" src="logo_bigger.png"/>
            <h1 className="know-your" id="loggedOut">Thank you for using Neighbours! Till next time!</h1>
            </div>
        )
    }
})

module.exports = loggedOut;
