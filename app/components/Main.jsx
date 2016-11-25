var React = require('react');
var Logo = require('./Logo.jsx');

var Main = React.createClass({
    render: function() {
        return(
            <div>
            <Logo/>
            <h2>Main component</h2>
            {this.props.children}
            </div>
        )
    }
})

module.exports = Main;
