
var React = require('react');
var {Link} = require('react-router');


var buildingExists = React.createClass({
    render: function() {
        return (
            <div>
                <h3 id="loginHeadline">Your building already exists here, would you like to join the group?</h3>
                    <button><Link to="/register">Yes</Link></button>
            </div>
        )
    }
})

module.exports = buildingExists;
