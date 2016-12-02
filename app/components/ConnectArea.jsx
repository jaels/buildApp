var React = require('react');
var ChatNav = require('./ChatNav.jsx')
var Conversations = require('./Conversations.jsx');
var ChatInput = require('./ChatInput.jsx');





class ConnectArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gotAllDetails: false,
            message: ""
        }
        this.handleNewMessage = this.handleNewMessage.bind(this);

        var that = this;
        axios.get('/getAllDetails').then(function(result) {
            that.setState({
                details:result.data.file,
                gotAllDetails: true
            })
            console.log(result.data.file);

            return;
        })
    }

    render() {
        var that = this;
        var details = this.state.details;
        var { gotAllDetails, details } = this.state;
        function rendering() {
            if(gotAllDetails) {
                return (
                    <div className="connectArea">
                        <ChatNav message= {that.state.message} details={details} />
                    <div className="conversationsArea">
                        {React.cloneElement(that.props.children, {message:that.state.message})}
                    </div>
                    <ChatInput onNewMessage={that.handleNewMessage}/>
                    </div>
                )
            }
        }

return (
    <div>
        {rendering()}
    </div>
)
}

handleNewMessage(message) {
this.setState({
    message:message
})
}


}



module.exports = ConnectArea;
