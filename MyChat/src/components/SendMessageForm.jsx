import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import React from 'react';

export default class SendMessageForm extends React.Component {
    state = {
        message: undefined
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Form onSubmit={e=> {
                e.preventDefault();
                this.props.sendMessage(this.state.message);
                this.setState({message: ''});
            }}>
                 <InputGroup>
                    <FormControl type="user" placeholder="message..."
                        onChange={e => this.setState({message: e.target.value})} value={this.state.message} />
                    {/* <InputGroup.Append> */}
                        <Button variant="primary" type="submit" disabled={!this.state.message}>Send</Button>
                    {/* </InputGroup.Append> */}
                </InputGroup>

            </Form>
        );
    }
}