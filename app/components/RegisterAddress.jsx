
var React = require('react');
var {Link} = require('react-router');


var RegisterAddress = React.createClass({
    render: function() {
        return (
            <div>
                <form>
                    <div>
                        <input type="text" placeholder="What's your address" ref="username"></input>
                    </div>
                    <button><Link to="/register">Submit</Link></button>
                </form>
            </div>
        )
    }
})

module.exports = RegisterAddress;
