var React = require('react');
var {Link} = require('react-router');


var ChatNav = React.createClass({
    render: function() {
        var details = this.props.details;
        var address = this.props.details.address;
        return (
            <div className="chatNav">
                <h3> {address}</h3>
            <p>General</p>
            </div>
        )
    },
    getUsers: function() {
        var that = this;
        axios.get('/getAllUsers').then(function(result) {
            that.setState({
                users:result.data.file,
                gotAllUsers: true
            })
            return;
        })
    }


})

module.exports = ChatNav;
