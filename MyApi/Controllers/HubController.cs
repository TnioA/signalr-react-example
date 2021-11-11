using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TaimeApi.Controllers
{
    public class HubController: Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        public static List<Message> _messages;

        public HubController(IDictionary<string, UserConnection> connection)
        {
            _botUser = "MyChat Bot";
            _connections = connection;

            if(_messages == null)
                _messages = new List<Message>();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");

                SendConnectedUsers(userConnection.Room);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", 
                    userConnection.User, message);
            
        }
        
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            _connections[Context.ConnectionId] = userConnection;
            
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser,
                $"{userConnection.User} acaba de entrar");

            await SendConnectedUsers(userConnection.Room);
        }

        public Task SendConnectedUsers(string room)
        {
            var users = _connections.Values.Where(x=> x.Room == room).Select(x=> x.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }

    public class UserConnection 
    {
        public string User { get; set; }
        public string Room { get; set; }
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