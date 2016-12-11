var React = require('react');
import io from 'socket.io-client';
import Moment from 'moment';





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
        this.logOut = this.logOut.bind(this);


        axios.get(`/getPrivateMessages/${whichChat}`).then(function(result) {
            that.setState({
                messages:result.data.file,
                gotMessages:true
            })
        })
    }

    render() {
        var that = this;
        var address = this.props.details.user.address;

        var messages = that.state.messages.map(function(message) {
            return (
                <div className="messagesContainer">
                    <div className="chatCircle"></div>
                    <div className="messageBox" id={message.id}>
                        <h4 className="messageText">{message.message}</h4>
                        <h5 className="messageName">{message.firstname} {message.lastname} | posted  {Moment(message.created_at).fromNow()}
                        </h5>
                    </div>
                </div>
            )
        })

        return(
            <div>
                <div className="chatUpperStreep">
                    <h3>#{address}</h3>
                    <button className="button" id="logOutButton" onClick={this.logOut}>Log Out</button>
                </div>


                <div className="inputAndChat">
                    <div className = "conversationsArea" ref='scrollDiv' onFocus={this.scrolling}>
                        <div>
                            {messages}
                        </div>
                    </div>
                    <div className="chatContainer">
                        <textArea className="textArea"  placeholder="Write your message" value={this.state.newMessage} onChange={this.handleChange} ></textArea>
                        <button className="button" id="send-btn" onClick={this.sendMessage}>Send</button>
                    </div>
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
        var that=this;
        e.preventDefault();

        var newMessage = that.state.newMessage;
        if(newMessage.length>0) {

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
    }

    handleChange(event) {
        this.setState({newMessage: event.target.value});
    }
    logOut() {
        socket.emit('bye', that.props.details.user.id);
        axios.get('logOut').then(function(reponse) {
            console.log('logged out');
            window.location.href = "#/loggedOut";

        })
    }


}

module.exports = privateChat;
