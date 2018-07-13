using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Acc.Hubs
{
    public class DistributeHub : Hub
    {
        public async Task SendData(string key, string value)
        {
            await Clients.All.SendAsync("ReceiveData", key, value);
        }
    }
}
