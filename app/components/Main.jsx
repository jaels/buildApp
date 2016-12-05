var React = require('react');
var Logo = require('./Logo.jsx');

var Main = React.createClass({
    render: function() {
        return(
            <div>
            <Logo/>
            {this.props.children}
            </div>
        )
    }
})

module.exports = Main;
