import React from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';
import { Button } from 'react-bootstrap';

export default class ConnectedUsers extends React.Component {
    state = {
        user: undefined,
        room: undefined
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="user-list">
                <h4>Connected Users</h4>
                {this.props.users.map((x, index) => 
                    <h6 key={index}>{x}</h6>
                )}
            </div>
        );
    }
}