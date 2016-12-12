var React = require('react');
var ChatNav = require('./ChatNav.jsx')
var Conversations = require('./Conversations.jsx');





class ConnectArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gotAllDetails: false,
            newMessage: ""
        }


        var details={};

        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.componentWillReceiveProps=this.componentWillReceiveProps.bind(this);

        var that = this;
        axios.get('/getAllDetails').then(function(result) {
            console.log(that.props.location.pathname);

            that.setState({
                details:result.data.file,
                gotAllDetails: true
            })
        })
    }

    componentWillReceiveProps(nextProps){
        var details=this.state.details;
        var loc = this.props.location.pathname.split('/');
        var whichChat = loc[loc.length-1];
        console.log(whichChat);
        details.whichChat=whichChat;
        this.setState({
            details:details
        })
        console.log(this.state.details);
}

    render() {
        var that = this;
        var details = this.state.details;
        var { gotAllDetails, details } = this.state;
        function rendering() {
            if(gotAllDetails) {
                return (
                    <div className="connectArea">
                        <ChatNav details={details} />
                    <div>
                        {React.cloneElement(that.props.children, {details:details,
                            onNewMessage:that.handleNewMessage
                        })}
                    </div>
                    </div>
                )
            }
        }

return (
    <div className="chat-body">
        {rendering()}
    </div>
)
}

handleNewMessage(newMessage) {
this.setState({
    newMessage:newMessage
})
}


}



module.exports = ConnectArea;
