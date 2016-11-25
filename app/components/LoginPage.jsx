var React = require('react');
var Login = require('./Login.jsx');
var RegisterAddress = require('./RegisterAddress.jsx');


var LoginPage = React.createClass({
    render: function() {
        return (
            <div>
                <Login/>
                <RegisterAddress/>
            </div>
        )
    }
})

module.exports = LoginPage;
