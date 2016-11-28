var React = require('react');
var ReactDOM = require('react-dom');
var RegisterUser = require('./components/RegisterUser.jsx');
var buildingExists = require('./components/buildingExists.jsx')

var Main = require('./components/Main.jsx');
var LoginPage = require('./components/LoginPage.jsx');


var {Route, Router, IndexRoute, hashHistory} = require('react-router');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="register" component={RegisterUser}/>
                <Route path="buildingExists" component={buildingExists}/>
            <IndexRoute component={LoginPage}/>
        </Route>

    </Router>,
    document.getElementById('app')
);
