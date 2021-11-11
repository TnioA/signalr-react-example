import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@microsoft/signalr';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';

interface Message {
  connectionId: string,
  userName: string,
  text: string,
  date: Date,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messages: Message[] = [];

  messageControl = new FormControl('');
  userName!: string;
  connection = new signalR.HubConnectionBuilder().withUrl("https://taniochat.herokuapp.com/chat").build();

  constructor(public dialog: MatDialog) {
    this.openDialog();
  }

  ngOnInit(): void {
  }

  openDialog(){
    const dialogRef = this.dialog.open(NameDialogComponent, { 
      width: '250px', 
      data: this.userName,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.userName = result;
      this.startConnection();
    });
  }

  startConnection(){
    this.connection.on("newMessage", (message: Message) => {
      this.messages.push(message);
    });

    this.connection.on("previousMessages", (messages: Message[]) => {
      this.messages = messages;
      this.messages.push({ 
        connectionId: this.connection.connectionId + '',
        userName: '',
        text: 'Você entrou na sala',
        date: new Date()
      });
    });

    this.connection.start().then(()=> {
      this.connection.send("loginUser", this.connection.connectionId, this.userName);
    });
  }

  sendMessage(){
    this.connection.send("newMessage", this.connection.connectionId, this.userName, this.messageControl.value)
      .then(() => {
        this.messageControl.setValue('');
      })
  }
}