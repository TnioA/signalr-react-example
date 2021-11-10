using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TaimeApi.Controllers
{
    public class HubController: Hub
    {
        public static List<Message> _messages;
        public HubController() 
        {
            if(_messages == null)
                _messages = new List<Message>();
        }

        public async Task NewMessage(string connectionId, string userName, string message)
        {
            Message newMsg = new Message(connectionId, userName, message);

            await Clients.All.SendAsync("newMessage", newMsg);
            _messages.Add(newMsg);
        }

        public async Task LoginUser(string connectionId, string userName)
        {
            await Clients.Client(connectionId).SendAsync("previousMessages", _messages);
            await Clients.Others.SendAsync("newMessage", new Message(connectionId, "", $"{userName} acaba de entrar"));
        }
    }

    public class Message 
    {
        public string ConnectionId { get; set; }
        public string UserName { get; set; }    
        public string Text { get; set; }
        public DateTime Date { get; set; }
        public Message(string connectionId, string userName, string text)
        {
            ConnectionId = connectionId;
            UserName = userName;
            Text = text;
            Date = DateTime.Now;
        }
    }
}