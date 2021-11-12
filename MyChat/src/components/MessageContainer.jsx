import React from 'react';

export default class MessageContainer extends React.Component {
    state = {
        room: undefined
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="row message" id="conversation">
                <div className="row message-previous">
                    <div className="col-sm-12 previous"></div>
                </div>
                {this.props.messages.map((x, index) => 
                    x.user === "MyChat Bot" 
                    ? <div className="row message-body" key={index}>
                        <div className="col-sm-12 message-main-server text-center">
                            <div className="server">
                                <span style={{color: "#6c6c6c"}}>
                                    {x.message}
                                </span>
                            </div>
                        </div>
                    </div>
                    : <div className="row message-body" key={index}>
                        <div className={this.props.user === x.user 
                            ? "col-sm-12 message-main-sender" 
                            : "col-sm-12 message-main-receiver"}>
                            <div className={this.props.user === x.user 
                                ? "sender" : "receiver"}>
                                <div className="message-text">
                                    {x.message}
                                </div>
                                <span className="message-time pull-right">
                                    {x.user}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
           </div>
        );
    }
}