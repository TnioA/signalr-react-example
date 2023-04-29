import React from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Lobby from './components/Lobby';
import Chat from './components/Chat';

export default class App extends React.Component {

  state = {
    connection: undefined,
    messages: [],
    users: [],
    user: undefined,
    room: undefined,
  }

  constructor(props){
    super(props);
  }

  joinRoom = async (user, room) => {
    try{
      const connection = new HubConnectionBuilder()
        .withUrl("/chat")
        .configureLogging(LogLevel.Information)
        .build();

        connection.on("UsersInRoom", (users) => {
          this.setState({ users: users });
        });

        connection.on("ReceiveMessage", (user, message) => {
          this.setState({ messages: [...this.state.messages, {user, message}]});
        });

        connection.onclose(e=> {
          this.setState({connection: null, messages: [], users: []});
        });

        await connection.start();
        await connection.invoke("JoinRoom", {user, room})
        this.setState({connection: connection, user: user, room: room});
    } catch(e){
      console.log(e);
    }
  }

  closeConnection = async () => {
    try{
      await this.state.connection.stop();
    } catch(e){
      console.log(e);
    }
  }

  sendMessage = async (message) => {
    try{
      await this.state.connection.invoke("SendMessage", message)
    } catch(e){
      console.log(e);
    }
  }
  
  render(){
    return (
      <div className="app">
        {!this.state.connection
        ? <Lobby joinRoom={this.joinRoom}></Lobby>
        : <Chat sendMessage={this.sendMessage} messages={this.state.messages} 
            closeConnection={this.closeConnection} users={this.state.users} 
              user={this.state.user} room={this.state.room}></Chat>}
        
      </div>
    );
  }
}