var React = require('react');
var Login = require('./Login.jsx');
var RegisterAddress = require('./RegisterAddress.jsx');
var axios = require('axios');

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        axios.get('getAllDetails').then(function(response) {
            if (response.data.success===true) {
                window.location.href = "#/connectArea";
            }
        })
    }
    render() {
        return (
            <div>
                <RegisterAddress/>
            </div>
        )
    }
}

module.exports = LoginPage;
