
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
            creationSuccess: false
        };
    },
    render: function() {
        var { address } = this.state;
        var { creationSuccess } = this.state;
        var { exists } = this.state;
        var { doesntExist } = this.state;
        var fixtures = [];
        var that=this;
        function checkExist () {
            if(exists) {
                return (
                    <div className="buildingExist">
                        <h3 id="loginHeadline">Your building already exists here, would you like to join the group?</h3>
                        <button className="button"><Link to="/register">Yes</Link></button>
                    </div>
                )
            };
            if(doesntExist) {
                return (
                    <div className="buildingExist">
                        <h3 id="loginHeadline">Your building is new here! Do you wanna create it?</h3>
                    <button className="button" onClick = {that.makeBuilding}>Yes!</button>
                        {renderSuccess()}

                    </div>
                )
            }
        };
        function renderSuccess () {
            if(creationSuccess) {
                return (
                    <div className="buildingExist">
                        <h3 id="loginHeadline"> Your building in <span id="createdAddress"> { address } </span> was created! Please register and tell your neighbours to join!</h3>
                        <button className="button"><Link to="/register">Register</Link></button>
                    </div>
                )
            }
        }
        return (
            <div className="LoginRegister" id="registerMain">
                <h3 id="loginHeadline">If not - Where do you live?</h3>
                <Geosuggest
                    // className="geosuggest"
                    placeholder="Type your address and choose from the list"
                    initialValue=""
                    fixtures={fixtures}
                    onSuggestSelect={this.onSuggestSelect}
                    onKeyPress = {this.onKeyPress}
                    onSuggestNoResults = {this.onSuggestNoResults}
                    location={new google.maps.LatLng(53.558572, 9.9278215)}
                    radius="20" />
                <h4 id="noAddressResults">Please submit an address</h4>
                <button className="button" id="submitAddress" className="button" onClick={this.saveAddress}>Submit</button>
                {checkExist()}
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
    }

})

module.exports = RegisterAddress;
