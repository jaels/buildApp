
var React = require('react');
var {Link} = require('react-router');


var Login = React.createClass({
    getInitialState: function() {
        return { error: false };
    },
    render: function() {
        return (
            <div className="LoginRegister" id="loginMain">
                <h3 id="loginHeadline">Already a user?</h3>
                <form>
                    <div>
                        <input type="text" placeholder="email" ref="email"></input>
                    </div>
                    <div>
                        <input type="text" placeholder="password" ref="password"></input>
                    </div>
                    <button className="button" onClick={this.loginUser}>Submit</button>
                </form>
                {this.state.error ? <h4 className="userError">wrong email or password</h4> : null}
            </div>
        )
    },
    loginUser: function() {
        var that = this;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        axios.post('/checkUser', {
            email: email,
            password: password,
        }).then(function(res) {
            console.log('heyyyy');
            if(res.data.success===true) {
                socket.userId = res.data.file.user.id;
                window.location.href = "#/connectArea";
            }
            else {
                console.log('blaaa');
                that.setState({error:true})
            }
        })
    }

})


module.exports = Login;
