import React from 'react';
import io from 'socket.io-client'

export default class FirstComponent extends React.Component {

    constructor(props) {
        super(props);
        this.props.firstActions.addContent({
            title: "Hello, world!"
        });
        this.state = {
            textValue: "hello"
        }

        this.socket = io.connect('http://localhost:3000');

        this.socket.on('global', (data) => {
            console.log("recieved:" + data.message);
            this.props.firstActions.addContent({title: data.message});
        });
    }

    textvalueChange(evt) {
        let textValue = evt.target.value;
        this.setState({textValue});
    }

    submitForm(evt) {
        console.log("clicked");
        this.socket.emit('global', this.state.textValue);
    }

    render() {            
        return (
            <div>
                <p>
                    {this.props.content.title}
                </p>
                <form>
                    <input type='text' onChange={this.textvalueChange.bind(this)} />
                    <input type='button' onClick={this.submitForm.bind(this)} value="Submit" />
                </form>
            </div>
        )
    }
}