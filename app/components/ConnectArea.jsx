var React = require('react');
var ChatNav = require('./ChatNav.jsx')

class ConnectArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gotAllDetails: false,
            newMessage: ""
        }
        var details={};
        var that = this;
        axios.get('/getAllDetails').then(function(result) {
            that.setState({
                details:result.data.file,
                gotAllDetails: true
            })
        })
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.componentWillReceiveProps=this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps(nextProps){
        var details=this.state.details;
        var loc = this.props.location.pathname.split('/');
        var whichChat = loc[loc.length-1];
        details.whichChat=whichChat;
        this.setState({
            details:details
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
