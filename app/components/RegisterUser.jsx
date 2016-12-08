
var React = require('react');
var {Link} = require('react-router');
var axios = require('axios');


var RegisterUser = React.createClass({
    render: function() {
        return (
            <div>
                <img className="logo-form" src="logo_small.png"/>
                    <img className="big-n" src="big_n_form_1024.png"/>
            <div className="RegisterUser">
                <div className="form-headlines">
                <h1 className="register-headline" id="form-hedline">Hello, neighbour.</h1>
                <p className="existText" id="form-subtitle">Fill in this form to join your building and chat away!</p>
                </div>
                <form>
                    <div>
                        <input className="inputField" type="text" placeholder="First name (required)" ref="firstname" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Last name (required)" ref="lastname" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Floor (required, please specify just a number)" ref="floor" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Apartment number (not required)" ref="aptNumber"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Building specifications (front/back, not required)" ref="buildingSpec"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Email (required)" ref="email" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Password (required)" ref="password"></input>
                        <br/>

                        </div>
                    <button className="button" onClick={this.registerNew}>Submit</button>
                </form>
            </div>
            </div>
        )
    },
    registerNew: function(e) {
        e.preventDefault();
        var firstname = this.refs.firstname.value;
        var lastname = this.refs.lastname.value;
        var floor = this.refs.floor.value;
        var aptNumber = this.refs.aptNumber.value;
        var buildingSpec = this.refs.buildingSpec.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        console.log([firstname, lastname, floor, aptNumber, buildingSpec, email, password]);
        axios.post('/registerUser', {
            firstname: firstname,
            lastname: lastname,
            floor: floor,
            aptNumber: aptNumber,
            buildingSpec: buildingSpec,
            email: email,
            password: password
        }).then(function(res) {
            if(res.data.success===true) {
                var user = {
                    id:res.data.file.user.id
                }
                        socket.emit('newUser', user);

                window.location.href = "#/connectArea";
            }
            else {

            }
        })



    }
})

module.exports = RegisterUser;
