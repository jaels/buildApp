var React = require('react');
var ChatNav = require('./ChatNav.jsx')
var Conversations = require('./Conversations.jsx');
var ChatInput = require('./ChatInput.jsx');





class ConnectArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gotAllDetails: false
        }
        console.log('constructor');
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
        this.getDetails();
        var that = this;
        var details = this.state.details;
        var { gotAllDetails, details } = this.state;
        function rendering() {
            if(gotAllDetails) {
                return (
                    <div className="connectArea">
                        <ChatNav details={details} />
                    <Conversations details={details}/>
                <ChatInput details={details}/>
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

getDetails() {
    var that = this;
    axios.get('/getAllDetails').then(function(result) {
        that.setState({
            details:result.data.file,
            gotAllDetails: true
        })
        return;

    })
}

}



module.exports = ConnectArea;
