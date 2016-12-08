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
        this.handleNewMessage = this.handleNewMessage.bind(this);

        var that = this;
        axios.get('/getAllDetails').then(function(result) {
            that.setState({
                details:result.data.file,
                gotAllDetails: true
            })

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
                        <button className="logOutButton" onClick={that.logOut}>Logout</button>

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
    <div>
        {rendering()}
    </div>
)
}

handleNewMessage(newMessage) {
this.setState({
    newMessage:newMessage
})
}

logOut() {
    axios.get('logOut').then(function(reponse) {
        console.log('logged out');
        window.location.href = "#/loggedOut";

    })
}

}



module.exports = ConnectArea;
