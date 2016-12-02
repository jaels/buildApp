var React = require('react');

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: ''};
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
}
    render() {
        return (
            <div className="chatContainer">
                <textArea className = "textArea"  placeholder="Write your message" value={this.state.message} onChange={this.handleChange} ></textArea>
            <button className="message_button" onClick={this.sendMessage}>Send</button>
            </div>
        )
    }
    sendMessage(e) {
        e.preventDefault();
        console.log(this.state.message)
        var message = this.state.message;
        this.props.onNewMessage(message);


    }

    handleChange(event) {
  this.setState({message: event.target.value});
}

}

module.exports = ChatInput;
