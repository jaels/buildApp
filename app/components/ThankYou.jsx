
var React = require('react');
var {Link} = require('react-router');


var ThankYou = React.createClass({
    render: function() {
        return (
            <div className="LoginRegister" id="loginMain">
                <h3 id="loginHeadline">Thank you for registering! Enter the group!</h3>
                    <button className="button"><Link to="/connectArea">Enter</Link></button>
            </div>
        )
    }
})

module.exports = ThankYou;
