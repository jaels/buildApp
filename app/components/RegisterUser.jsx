
var React = require('react');
var {Link} = require('react-router');
import $ from 'jquery';


var RegisterUser = React.createClass({
    render: function() {
        return (
            <div className="RegisterUser">
                <h3 id="loginHeadline">Please fill this form</h3>
                <form>
                    <div>
                        <input className="inputField" type="text" placeholder="* First Name" ref="firstname" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="* Last Name" ref="lastname" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="* Floor" ref="floor" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Apt. number" ref="apt_number"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Building specifications" ref="building_specifications"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="* Email" ref="email" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="* password" ref="password"></input>
                        <br/>

                        </div>
                    <button><Link to="/connectArea">Submit</Link></button>
                </form>
            </div>
        )
    }
})

module.exports = RegisterUser;
