var React = require('react');
var {Link, IndexLink} = require('react-router');

class ChatNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            connected:{},
            newChat:{},
            newGeneralChat:false,
            current:"general",
            hover:{}
        }
        this.componentDidMount = this.componentDidMount.bind(this);

        var that = this;
        axios.get('/getAllUsers').then(function(result) {
            that.setState({
                users:result.data.file
            })
        });
        axios.get('/whosConnected').then(function(result) {
            that.setState({
                connected:result.data.file
            });
        });
    };
    componentDidMount() {
        var that=this;
        var newChat={};
        socket.on('hey', function(connected) {
            that.setState({
                connected:connected
            })
        });
        socket.on('bye', function(connected) {
            that.setState({
                connected:connected
            });
        });

        socket.on("toNav", function(message) {
            if(that.props.details.user.id.toString()==message.otherUser && that.state.current!==message.user_id.toString()) {
                newChat[message.user_id.toString()]=true;
                that.setState({
                    newChat:newChat
                });
            }
        })
        socket.on("send:message", function(message) {
            if(that.state.current!=="general") {
                that.setState({
                    newGeneralChat:true
                })
            }
        })
    }
    render() {
        var that = this;
        var { gotAllUsers, users } = this.state;
        var details = this.props.details;
        var address = this.props.details.address;
        var users = that.state.users.map(function(user) {
            var chatUrl = [that.props.details.user.id,user.id].sort(function(a,b) {
                return (a-b);
            }).join('_');
            function isNew() {
                if(that.state.newChat[user.id.toString()]) {
                    return (
                        <div className="bubbleContainer">
                            <img className="speechBubble" src="speech-bubble-xxl.png"/>
                        </div>
                    )
                }
            }
            function checkConnected() {
                if(that.state.connected[user.id.toString()]) {
                    return (
                        <div className="fullUsersCircle"></div>
                    )
                }
                else {
                    return (
                        <div className="emptyUsersCircle"></div>
                    )
                }
            }
            function cancelBubble () {
                that.state.newChat[user.id.toString()]=false;
                that.state.current=user.id.toString();
            }
            function onMouseEnterHandler() {
                var hover = that.state.hover;
                hover[user.id.toString()]=true;
                that.setState({
                    hover:hover
                });
            }
            function onMouseLeaveHandler() {
                var hover = that.state.hover;
                hover[user.id.toString()]=false;
                that.setState({
                    hover:hover
                });
            }
            function checkHover() {
                if(that.state.hover[user.id.toString()]) {
                    return (
                        <div className="detailsWrapper">
                            <div className="usersDetails">
                                <p>Email: {user.email}</p>
                                <p>Floor: {user.floor}</p>
                                <p>Building: {user.building_specifications}</p>
                                <p>Apt.number: {user.apt_number}</p>
                            </div>
                        </div>
                    )
                }
            }

            return (
                <div className="nameAndCircle">
                    {checkConnected()}
                    <Link onClick={cancelBubble} to={`/connectArea/${chatUrl}`} activeClassName="active" id={user.id}
                        onMouseEnter={onMouseEnterHandler}
                        onMouseLeave={onMouseLeaveHandler}
                        > <p  className="nav-text">{user.firstname} {user.lastname}</p></Link>
                    {isNew()}
                    {checkHover()}
                </div>
            )
        })

        function isNewGeneral() {
            if(that.state.newGeneralChat) {
                return (
                    <div className="bubbleContainer" id="generalBubble">
                        <img className="speechBubble" src="speech-bubble-xxl.png"/>
                    </div>
                )
            }
        }

        function cancelGeneralBubble() {
            that.state.newGeneralChat=false;
            that.state.current="general";
        }

        return (
            <div className="chatNav">
                <img className="logo-main" id="logoChat" src="logo_small.png"/>
                <div className="channelsNames">
                    <p className="invite-text" id="youChat">#{this.props.details.user.firstname } {this.props.details.user.lastname} (you)</p>
                    <IndexLink to="/connectArea" activeClassName="active"><p className="nav-text" id="generalChat" onClick={cancelGeneralBubble}>GENERAL</p></IndexLink>
                    {isNewGeneral()}
                    <h3 className="invite-text">Send a private message:</h3>
                    <div className="usersArea">
                        {users}
                    </div>
                    <h3 className="invite-text" id="invite">+ invite your neighbours</h3>
                </div>
            </div>
        )
    }
}


module.exports = ChatNav;
