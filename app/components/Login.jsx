
var React = require('react');
var {Link} = require('react-router');


var Login = React.createClass({
    render: function() {
        return (
            <div className="LoginRegister" id="loginMain">
                <h3 id="loginHeadline">Already a user?</h3>
                <form>
                    <div>
                        <input type="text" placeholder="email" ref="username"></input>
                    </div>
                    <div>
                        <input type="text" placeholder="password" ref="password"></input>
                    </div>
                    <button><Link to="/connectArea">Submit</Link></button>
                </form>
            </div>
        )
    }
})

module.exports = Login;
