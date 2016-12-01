var React = require('react');
var ReactDOM = require('react-dom');
var RegisterUser = require('./components/RegisterUser.jsx');
var buildingExists = require('./components/buildingExists.jsx');
var createBuilding = require('./components/createBuilding.jsx');
var thankYou = require('./components/ThankYou.jsx')
var connectArea = require('./components/ConnectArea.jsx')



var Main = require('./components/Main.jsx');
var LoginPage = require('./components/LoginPage.jsx');


var {Route, Router, IndexRoute, hashHistory} = require('react-router');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="register" component={RegisterUser}/>
                <Route path="buildingExists" component={buildingExists}/>
                    <Route path="createBuilding" component={createBuilding}/>
                        <Route path="thankYou" component={thankYou}/>
                            <Route path="connectArea" component={connectArea}/>
            <IndexRoute component={LoginPage}/>
        </Route>

    </Router>,
    document.getElementById('app')
);
