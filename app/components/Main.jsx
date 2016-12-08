var React = require('react');
var Logo = require('./Logo.jsx');

var Main = React.createClass({
    render: function() {
        return(
            <div className="main">
            {this.props.children}
            </div>
        )
    }
})

module.exports = Main;
