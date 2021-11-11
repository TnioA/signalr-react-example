import React from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';
import ConnectedUsers from './ConnectedUsers';
import { Button } from 'react-bootstrap';

export default class Chat extends React.Component {
    state = {
        user: undefined,
        room: undefined
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className="leave-room">
                    <Button variant="danger" onClick={()=> this.props.closeConnection()}>Leave Room</Button>
                </div>
                <ConnectedUsers users={this.props.users}></ConnectedUsers>
                <div className="chat">
                    <MessageContainer messages={this.props.messages}></MessageContainer>
                    <SendMessageForm sendMessage={this.props.sendMessage}></SendMessageForm>
                </div>
            </div>
        );
    }
}