
var React = require('react');
var {Link} = require('react-router');
var axios = require('axios');


var RegisterUser = React.createClass({
    getInitialState: function() {
        return {
            success:true,
            required:true,
            emailExists:false
        }
    },
    render: function() {
        var that=this;
        function check() {
            if(that.state.success===false) {
                return (
                    <h3 className="error-msg" id="notRegisterred">Please go to homepage and register an address first</h3>
                )
            }
        }

        function checkToo() {
            if(that.state.required===false) {
                return (
                    <h3 className="error-msg" id="notRegisterred">Please fill all the required fields</h3>
                )
            }
        }

        function checkEmail() {
            if(that.state.emailExists) {
                return (
                    <h3 className="error-msg" id="notRegisterred">Your email already exists here, you can register in only one building</h3>

                )
            }
        }

        return (
            <div>
                <img className="logo-form" src="logo_small.png"/>
                <img className="big-n" src="big_n_form_1024.png"/>
                <div className="RegisterUser">
                    {check()}
                    {checkToo()}
                    {checkEmail()}
                    <div className="form-headlines">
                        <h1 className="register-headline" id="form-hedline">Hello, neighbour.</h1>
                        <p className="existText" id="form-subtitle">Fill in this form to join your building and chat away!</p>
                    </div>
                    <form>
                        <div className="theForm">
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
                        <button className="button" id="submit-btn" onClick={this.registerNew}>Submit</button>
                    </form>
                </div>
            </div>
        )
    },
    registerNew: function(e) {
        var that=this;
        e.preventDefault();
        var firstname = this.refs.firstname.value;
        var lastname = this.refs.lastname.value;
        var floor = this.refs.floor.value;
        var aptNumber = this.refs.aptNumber.value;
        var buildingSpec = this.refs.buildingSpec.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        if(firstname.length===0 || lastname.length===0 || floor.toString().length===0 || email.length===0 || email.indexOf('@')===-1 || password.length===0) {
            that.setState({
                required:false
            })
            console.log('not all required');
            console.log(that.state)
        }

        else {
            axios.get('/checkAddress').then(function(result) {
                if(result.data.success==true) {
                    axios.post('/registerUser', {
                        firstname: firstname.toUpperCase(),
                        lastname: lastname.toUpperCase(),
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
                            that.setState({
                                emailExists:true
                            })
                        }
                    })
                }

                else {
                    that.setState({
                        success:false
                    })

                }

            })


        }



    }
})

module.exports = RegisterUser;
