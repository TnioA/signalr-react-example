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
            <>
            <form className="form-signin text-center" onSubmit={e=> {
                    e.preventDefault();
                    this.props.joinRoom(this.state.user, this.state.room);
                }}>
                <img className="mb-4" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" width="72" height="72" style={{borderRadius: "50%"}} />
                <h1 className="h3 mb-3 font-weight-normal">Insira os dados</h1>
                <input type="text" id="inputEmail" className="form-control" placeholder="Nome" required="" autoFocus="" onChange={e=> this.setState({user: e.target.value})} />
                <input type="text" id="inputPassword" className="form-control" placeholder="Sala" required="" onChange={e=> this.setState({room: e.target.value})} />
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!this.state.user || !this.state.room}>Sign in</button>
                <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            </form>
            </>
        );
    }
}