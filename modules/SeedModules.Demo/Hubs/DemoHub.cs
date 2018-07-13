using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Demo.Hubs
{
    public class DemoHub : Hub
    {
        public async Task SendData(string key, string data)
        {
            await Clients.All.SendAsync("ReceiveData", key, data);
        }
    }
}
