var React = require('react');
var ReactDOM = require('react-dom');
var RegisterUser = require('./components/RegisterUser.jsx');
var createBuilding = require('./components/createBuilding.jsx');
var connectArea = require('./components/ConnectArea.jsx')

var privateChat = require('./components/privateChat.jsx');

var generalChat = require('./components/generalChat.jsx');

var loggedOut = require('./components/loggedOut.jsx');


var Conversations = require('./components/Conversations.jsx');

var Main = require('./components/Main.jsx');
var LoginPage = require('./components/LoginPage.jsx');



var {Route, Router, IndexRoute, hashHistory} = require('react-router');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
        <IndexRoute component={LoginPage}/>
    <Route path="register" component={RegisterUser}/>
<Route path="connectArea" component={connectArea}>
    <Route path="privateChat/:chat_with_id" component={privateChat}/>
<IndexRoute component={generalChat}/>

</Route>

<Route path="loggedOut" component={loggedOut}/>


        </Route>

    </Router>,
    document.getElementById('app')
);
