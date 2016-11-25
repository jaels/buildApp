var React = require('react');
var ReactDOM = require('react-dom');
// var Login = require('./components/Login.jsx');
// var RegisterAddress = require('./components/RegisterAddress.jsx');
var Main = require('./components/Main.jsx');
var LoginPage = require('./components/LoginPage.jsx');


var {Route, Router, IndexRoute, hashHistory} = require('react-router');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={LoginPage}/>
        </Route>

    </Router>,
    document.getElementById('app')
);
