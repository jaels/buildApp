var React = require('react');

var generalChat = React.createClass({
    render: function() {
        return(
            <div>
            <h2>general Chat!!</h2>
        <h1>GENERALLLLL</h1>
            <h2>{this.props.message}</h2>
    </div>
        )
    }
})

module.exports = generalChat;
