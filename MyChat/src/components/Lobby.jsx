import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class Lobby extends React.Component {
    state = {
        user: undefined,
        room: undefined
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Form className="lobby" onSubmit={e=> {
                e.preventDefault();
                this.props.joinRoom(this.state.user, this.state.room);
            }}>
                <Form.Group>
                    <Form.Control placeholder="name" onChange={e=> this.setState({user: e.target.value})} />
                    <Form.Control placeholder="room" onChange={e=> this.setState({room: e.target.value})} />
                </Form.Group>
                <Button variant="success" type="submit" disabled={!this.state.user || !this.state.room}>Join</Button>
            </Form>
        );
    }
}