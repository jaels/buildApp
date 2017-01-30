
var ReactDOM = require('react-dom');
var React = require('react');
var {Link} = require('react-router');
import Geosuggest from 'react-geosuggest';
<Geosuggest />
var axios = require('axios');
var {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');



var RegisterAddress = React.createClass({
    getInitialState: function() {
        return { exists: false,
            doesntExist:false,
            creationSuccess: false,
            openLogin:false,
            openAbout:false
        };
    },
    render: function() {
        var { address } = this.state;
        var { creationSuccess } = this.state;
        var { exists } = this.state;
        var { doesntExist } = this.state;
        var { openLogin } = this.state;
        var { openAbout } = this.state;

        var fixtures = [];
        var that=this;
        function checkExist () {
            if(exists) {
                return (
                    <div className="buildingExist">
                        <h3 className="existText">Your building already exists here, would you like to join the group?</h3>
                        <a href="#/register"><button className="button" id="yes-btn">Yes</button></a>
                    </div>
                )
            };
            if(doesntExist) {
                return (
                    <div className="buildingExist">
                        <h3 className="existText">Your building is new here! Do you wanna create it?</h3>
                    <button className="button" id="yes-btn" onClick = {that.makeBuilding}>Yes!</button>
                        {renderSuccess()}
                    </div>
                )
            }
        };
        function renderSuccess () {
            if(creationSuccess) {
                return (
                    <div className="buildingDontExist">
                        <h3 className="existText"> Great! Your building in <span id="createdAddress"> { address } </span> was created!
                            <br/>
                        Please register and tell your neighbours to join!
                        </h3>
                        <a href="#/register"><button className="button" id="yes-btn">Register</button></a>
                    </div>
                )
            }
        }


function aboutText() {
    if(openAbout) {
        return (
            <div>
            <p className="aboutText">
                Please check out <a href="                 https://vimeo.com/195662970" target="_blank">
this</a> video to understand the idea behind neighbours. The password is: neighbours2016
<br/>
<div className="credits">
                This app was created by Yael Stein.<br/>
                Design: Noga Inbar
            </div>
            </p>
            </div>
        )
    }
}

        function loginForm () {
            if(openLogin) {
                return (
                    <form className="loginForm">
                        <div className="loginBoxes">
                            <p className="loginText">Email</p>
                            <input type="text" ref="email" className="input-box"></input>
                            <p className="loginText">Password</p>
                            <input type="password" ref="password" className="input-box"></input>
                        </div>
                        <button className="button" id="submitLogin" onClick={that.loginUser}>Submit</button>
                    {that.state.error ? <h4 className="userError">wrong email or password</h4> : null}
                </form>
                )
            }
        }
        return (
            <div className="landing">
                <img className="logo-main" src="logo_small.png"/>
                <img className="building-image" src="building2.png"/>

                <div>
                    <button className="button" id="login-btn" onClick={this.open}>Log In</button>
                </div>
                <div className="login-container">
                    {loginForm()}
                </div>
<div>
    <h5 id="about-btn" onClick={this.openAbout}>About</h5>
</div>
<div className="about-container">
{aboutText()}
</div>
            <div className="addressContainer">
                <div>
                <h3 className="know-your">Know your neighbours.</h3>
                </div>
                <div className="geo-wrapper">
                <Geosuggest
                    placeholder="Type your address and choose from the list"
                    initialValue=""
                    fixtures={fixtures}
                    onSuggestSelect={this.onSuggestSelect}
                    onKeyPress = {this.onKeyPress}
                    onSuggestNoResults = {this.onSuggestNoResults}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius="20" />
            </div>
                <h4 id="noAddressResults">Please submit an address</h4>
                <button className="button" id="submitAddress" onClick={this.saveAddress}>Submit</button>
                {checkExist()}
            </div>
        </div>
        )
    },
    onSuggestSelect: function(suggest) {
        this.setState({ suggest: suggest });
        document.getElementsByClassName("geosuggest__suggests-wrapper")[0].style.display = "none";


    },
    onKeyPress: function(event) {
        document.getElementsByClassName("geosuggest__suggests-wrapper")[0].style.display = "block";
    },
    saveAddress: function(e) {
        e.preventDefault();
        var that = this;
        var suggest = this.state.suggest;
        var address = suggest.label;
        var placeId = suggest.placeId;
        axios.post('/checkBuilding', {
            address: address,
            placeId: placeId
        }).then(function(res) {
            if(res.data.success===true) {
                that.setState({
                    exists:true
                })
            }
            else {
                that.setState({
                    doesntExist:true
                })
            }
        })

    },
    makeBuilding: function(e) {
        e.preventDefault();
        var that=this;
        axios.get('/registerBuilding').then(function(result) {
            that.setState({
                creationSuccess: true,
                address: result.data.file
            })

        })
    },

open: function() {
    if(this.state.openLogin===false) {
        this.setState({
            openLogin:true
        })
    }
    else {
        this.setState({
            openLogin:false
        })

    }
},

openAbout: function() {
    if(this.state.openAbout===false) {
        this.setState({
            openAbout:true
        })
    }
    else {
        this.setState({
            openAbout:false
        })

    }

},

    loginUser: function(e) {
        e.preventDefault();
        var that = this;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        axios.post('/checkUser', {
            email: email,
            password: password,
        }).then(function(res) {
            console.log('heyyyy');
            if(res.data.success===true) {
                var user = {
                    id:res.data.file.user.id
                }
                        socket.emit('newUser', user);
                window.location.href = "#/connectArea";
            }
            else {
                console.log('blaaa');
                that.setState({error:true})
            }
        })
    }
})

module.exports = RegisterAddress;
