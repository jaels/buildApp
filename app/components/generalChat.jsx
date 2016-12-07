var React = require('react');
import io from 'socket.io-client';
var socket = io(`http://localhost:3000`);





class generalChat extends React.Component {
    constructor(props) {
        super(props);
        var that = this;
        this.state = {
            messages:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.messageRecieve = this.messageRecieve.bind(this);



        var buildingId = this.props.details.buildingId;


        axios.get(`/getGeneralMessages/${buildingId}`).then(function(result) {
            that.setState({
                messages:result.data.file
            })
        })
    }

    render() {
        var that = this;
        var messages = that.state.messages.map(function(message) {
            return (
                <div className="messagesContainer">
                    <div id={message.id}>
                        <h4 className="messageText">{message.message}</h4>
                        <h5 className="messgageName">{message.firstname} {message.lastname}</h5>  posted on {message.created_at}
                        </div>
                    </div>
                )
            })

            return(
                <div className="inputAndChat">
                    <div className = "conversationsArea" ref='scrollDiv' onFocus={this.scrolling}>
                        <div>
                            {messages}
                        </div>
                    </div>
                    <div className="chatContainer">
                        <textArea className = "textArea"  placeholder="Write your message" value={this.state.newMessage} onChange={this.handleChange} ></textArea>
                        <button className="message_button" onClick={this.sendMessage}>Send</button>
                    </div>
                </div>
            )
        }

        componentDidUpdate() {
            console.log('scrolling');
            this.refs.scrollDiv.scrollTop = this.refs.scrollDiv.scrollHeight;
        }

        componentDidMount() {
            socket.on('connection', this.connected);
            socket.on('disconnection', this.disconnected);
            socket.on('send:message', this.messageRecieve);
}

connected() {
console.log('connected!');
}
disconnected() {
    console.log('disconnected!');

}

messageRecieve(message) {
    var {messages} = this.state;
messages.push(message);
this.setState({messages});
}

        sendMessage(e) {
            var that =this;
            e.preventDefault();
            var newMessage = this.state.newMessage;
            this.state.newMessage = "";
            axios.post('insertGeneralMessage', {
                newMessage:newMessage
            }).then(function(response) {
                newMessage = response.data.file;
                that.props.onNewMessage(newMessage);
                console.log(that.state.messages);
                socket.emit('send:message', newMessage);

            })
        }

        handleChange(event) {
            this.setState({newMessage: event.target.value});
        }


    }

    module.exports = generalChat;
