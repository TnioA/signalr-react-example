import React from 'react';

export default class MessageContainer extends React.Component {
    state = {
        user: undefined,
        room: undefined
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="message-container">
                {this.props.messages.map((x, index) => 
                    <div key={index} className="user-message">
                        <div className="message bg-primary">{x.message}</div>
                        <div className="from-user">{x.user}</div>
                    </div>
                )}
            </div>
        );
    }
}