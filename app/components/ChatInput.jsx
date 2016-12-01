var React = require('react');


var ChatInput = React.createClass({
    render: function() {
        return (
            <div className="chatContainer">
                <textArea className = "textArea"  ref="message" placeholder="Write your message"></textArea>
            </div>
        )
    }
})

module.exports = ChatInput;
