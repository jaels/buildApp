var React = require('react');

class anotherChat extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.message)
}

    render() {
        return(
            <div>
            <h2>Another Chat!!</h2>
        <h1>ANOTHER</h1>
    </div>
        )
    }
}

module.exports = anotherChat;
