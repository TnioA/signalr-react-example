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
            this.props.users.map((x, index) => 
                <div className="row sideBar-body" key={index}>
                    <div className="col-sm-3 col-xs-3 sideBar-avatar">
                    <div className="avatar-icon">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                    </div>
                    </div>
                    <div className="col-sm-9 col-xs-9 sideBar-main">
                    <div className="row">
                        <div className="col-sm-8 col-xs-8 sideBar-name">
                        <span className="name-meta">{x}
                        </span>
                        </div>
                        <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                        <span className="time-meta pull-right">18:18
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
            )
        );
    }
}