var React = require('react');
import io from 'socket.io-client';
var socket = io(`http://localhost:3000`);





class privateChat extends React.Component {
    constructor(props) {
        super(props);
console.log(this.props.details);
var user = {
    id:this.props.details.user.id
}
        socket.emit('newUser', user);



        var loc = this.props.location.pathname.split('/');
        var whichChat = loc[loc.length-1];
        var that = this;
        this.state = {
            messages:[],
            whichChat:whichChat
        };
        this.setState({
            messages:[],
            whichChat:whichChat
        })

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.messageRecieve = this.messageRecieve.bind(this);
        var whichChat = this.state.whichChat;

        axios.get(`/getPrivateMessages/${whichChat}`).then(function(result) {
            console.log(result.data.file)
            that.setState({
                messages:result.data.file,
                gotMessages:true
            })
        })
    }
    componentWillReceiveProps(nextProps) {

        var loc = this.props.location.pathname.split('/');
        var whichChat = loc[loc.length-1];
        var that = this;
        this.state = {
            messages:[],
            whichChat:whichChat
        };
        this.setState({
            messages:[],
            whichChat:whichChat
        })

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.messageRecieve = this.messageRecieve.bind(this);
        var whichChat = this.state.whichChat;

        axios.get(`/getPrivateMessages/${whichChat}`).then(function(result) {
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
            this.refs.scrollDiv.scrollTop = this.refs.scrollDiv.scrollHeight;
        }
        componentDidMount() {
            socket.on('send:private', this.messageRecieve);

        }

        messageRecieve(message) {
            console.log('recievedddd')
            var {messages} = this.state;
            if(message.chat_name==this.state.whichChat) {
                messages.push(message);
                this.setState({messages});
            }
        }


        sendMessage(e) {
            var that =this;
            e.preventDefault();

            var newMessage = this.state.newMessage;
            this.setState({
            newMessage:""   
            })
            axios.post('insertPrivateMessage', {
                newMessage:newMessage,
                whichChat:that.state.whichChat
            }).then(function(response) {
                newMessage = response.data.file;
                that.props.onNewMessage(newMessage);
                var arr = that.state.whichChat.split('_');
                var thisUser = that.props.details.user.id;
                if(thisUser==arr[0]) {
                    var otherUser = arr[1]
                }
                else {
                    var otherUser = arr[0]
                }
                newMessage.otherUser = otherUser;
                console.log(newMessage);
                console.log(otherUser);
                    console.log('sending private')
                socket.emit("send:private", newMessage);


            })
        }

        handleChange(event) {
            this.setState({newMessage: event.target.value});
        }


    }

    module.exports = privateChat;
