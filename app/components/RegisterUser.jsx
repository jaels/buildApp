
var React = require('react');
var {Link} = require('react-router');
var axios = require('axios');


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
                        <input className="inputField" type="text" placeholder="* Floor (specify just a number)" ref="floor" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Apt. number" ref="aptNumber"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="Building specifications (front/back/left)" ref="buildingSpec"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="* Email" ref="email" required="require"></input>
                        <br/>
                        <input className="inputField" type="text" placeholder="* password" ref="password"></input>
                        <br/>

                        </div>
                    <button className="button" onClick={this.registerNew}>Submit</button>
                </form>
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
