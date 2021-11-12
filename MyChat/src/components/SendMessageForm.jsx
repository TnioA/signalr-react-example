import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import React from 'react';

export default class SendMessageForm extends React.Component {
    state = {
        message: undefined
    }

    constructor(props){
        super(props);
    }

    sendMessage = () => {
        if(!this.state.message){
            document.getElementById("comment").focus();
            return;
        }

        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    }

    render(){
        return (
            <div className="row reply">
                <div className="col-sm-1 col-xs-1 reply-emojis">
                    <i className="fa fa-smile-o fa-2x"></i>
                </div>
                <div className="col-sm-10 col-xs-10 reply-main">
                    <textarea 
                        className="form-control" 
                        rows="1" 
                        id="comment"
                        placeholder="message..."
                        onChange={e => this.setState({message: e.target.value})} value={this.state.message}
                    ></textarea>
                </div>
                {/* <div className="col-sm-1 col-xs-1 reply-recording">
                <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
                </div> */}
                <div className="col-sm-1 col-xs-1 reply-send">
                    {/* <Button variant="primary" type="submit" disabled={}>Send</Button> */}
                    <i className="fa fa-send fa-2x" aria-hidden="true" onClick={this.sendMessage}></i>
                </div>
            </div>
        );
    }
}