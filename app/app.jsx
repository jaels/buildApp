var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('./components/Main.jsx');
var LoginPage = require('./components/LoginPage.jsx');
var RegisterUser = require('./components/RegisterUser.jsx');
var connectArea = require('./components/ConnectArea.jsx')
var privateChat = require('./components/privateChat.jsx');
var generalChat = require('./components/generalChat.jsx');
var loggedOut = require('./components/loggedOut.jsx');

var {Route, Router, IndexRoute, hashHistory} = require('react-router');


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={LoginPage}/>
            <Route path="register" component={RegisterUser}/>
            <Route path="connectArea" component={connectArea}>
                <Route path=":chat_with_id" component={privateChat}/>
                <IndexRoute component={generalChat}/>
            </Route>
            <Route path="loggedOut" component={loggedOut}/>
        </Route>
    </Router>,
    document.getElementById('app')
);
