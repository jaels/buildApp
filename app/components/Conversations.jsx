var React = require('react');


var Conversations = React.createClass({
    render: function() {
        var details = this.props.details;
        return (
            <div className="conversationsArea">
                <h3>these are conversations</h3>
            </div>
        )
    }
})

module.exports = Conversations;
