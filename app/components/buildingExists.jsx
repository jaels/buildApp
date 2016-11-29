
var React = require('react');
var {Link} = require('react-router');


var buildingExists = React.createClass({
    render: function() {
        return (
            <div className="buildingExist">
                <h3 id="loginHeadline">Your building already exists here, would you like to join the group?</h3>
                    <button className="button"><Link to="/register">Yes</Link></button>
            </div>
        )
    }
})

module.exports = buildingExists;
