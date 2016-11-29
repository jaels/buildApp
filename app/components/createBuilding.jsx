
var React = require('react');
var {Link} = require('react-router');
var axios = require('axios');


var createBuilding = React.createClass({
    getInitialState: function() {
        return { creationSuccess: false };
    },
    render: function() {
        var { address } = this.state;
        var { creationSuccess } = this.state;
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
            <div className="buildingExist">
                <h3 id="loginHeadline">Your building is new here! Do you wanna create it?</h3>
                <button className="button" onClick = {this.makeBuilding}>Yes!</button>
                {renderSuccess()}
            </div>
        )
},
makeBuilding: function() {
    var that=this;
    axios.get('/registerBuilding').then(function(result) {
        that.setState({
            creationSuccess: true,
            address: result.data.file
        })

    })
}
})

module.exports = createBuilding;
