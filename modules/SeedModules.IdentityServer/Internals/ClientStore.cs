using IdentityServer4.Models;
using IdentityServer4.Stores;
using Seed.Data;
using SeedModules.IdentityServer.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.IdentityServer.Internals
{
    public class ClientStore : IClientStore
    {
        readonly IDbContext _dbContext;

        public ClientStore(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Client> FindClientByIdAsync(string clientId)
        {
            var client = await _dbContext.Set<IdentityClient>().FindAsync(int.Parse(clientId));
            if (client != null)
            {
                return new Client()
                {
                    ClientId = clientId,
                    ClientName = client.ClientName,
                    LogoUri = client.LogoUri
                };
            }
            return null;
        }
    }
}
