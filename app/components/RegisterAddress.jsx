
var ReactDOM = require('react-dom');
var React = require('react');
var {Link} = require('react-router');
import Geosuggest from 'react-geosuggest';
<Geosuggest />
var axios = require('axios');
var {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');



var RegisterAddress = React.createClass({
    render: function() {
        var fixtures = [];
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
                <button id="submitAddress" onClick={this.saveAddress}>Submit</button>
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
    saveAddress: function() {
        console.log('saving');
        var suggest = this.state.suggest;
        var address = suggest.label;
        var placeId = suggest.placeId;
        axios.post('/checkBuilding', {
            address: address,
            placeId: placeId
        }).then(function(res) {
            if(res.data.success===true) {
                window.location.href = "#/buildingExists";
            }
            else {
                window.location.href = "#/createBuilding";
            }
        })

    }


})

module.exports = RegisterAddress;
