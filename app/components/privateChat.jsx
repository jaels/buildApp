var React = require('react');
import io from 'socket.io-client';
var socket = io(`http://localhost:3000`);





class privateChat extends React.Component {
    constructor(props) {
        super(props);
        var loc = this.props.location.pathname.split('/');
        var whichChat = loc[loc.length-1];
        var that = this;
        this.state = {
            messages:[],
            whichChat:whichChat
        };
        this.setState({
            messages:[]
        })
        console.log(this.state.messages)

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.messageRecieve = this.messageRecieve.bind(this);
        var whichChat = this.state.whichChat;
        console.log(whichChat);

        axios.get(`/getPrivateMessages/${whichChat}`).then(function(result) {
            console.log(result.data.file)
            that.setState({
                messages:result.data.file,
                gotMessages:true
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
                        <h5 className="messgageName">{message.firstname} {message.lastname}</h5>  posted on {message.created_at}>
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
            this.refs.scrollDiv.scrollTop = this.refs.scrollDiv.scrollHeight;
        }
        componentDidMount() {
            socket.on("send:private", this.messageRecieve);
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
            axios.post('insertPrivateMessage', {
                newMessage:newMessage,
                whichChat:that.state.whichChat
            }).then(function(response) {
                newMessage = response.data.file;
                console.log('newMaessage');
                console.log(newMessage)
                that.props.onNewMessage(newMessage);
                console.log('that state messages')
                console.log(that.state.messages);
                 socket.emit("send:private", newMessage);


            })
        }

        handleChange(event) {
            this.setState({newMessage: event.target.value});
        }


    }

    module.exports = privateChat;