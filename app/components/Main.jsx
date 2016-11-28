var React = require('react');
var Logo = require('./Logo.jsx');

var Main = React.createClass({
    render: function() {
        return(
            <div onClick={this.closeSuggests}>
            <Logo/>
            {this.props.children}
            </div>
        )
    },
    closeSuggests: function() {
        document.getElementsByClassName("geosuggest__suggests-wrapper")[0].style.display = "none";
    }
})

module.exports = Main;
