using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using OpenIddict.Core;
using Seed.Data;
using SeedModules.OAuth.Domain;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SeedModules.OAuth.Stores
{
    public class OAuthApplicationStore : IOpenIddictApplicationStore<OAuthApplication>
    {
        readonly IDbContext _dbContext;

        public OAuthApplicationStore(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<long> CountAsync(CancellationToken cancellationToken)
        {
            return Set().LongCountAsync(cancellationToken);
        }

        public Task<long> CountAsync<TResult>(Func<IQueryable<OAuthApplication>, IQueryable<TResult>> query, CancellationToken cancellationToken)
        {
            return query(Set()).LongCountAsync(cancellationToken);
        }

        public Task CreateAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            return Task.Run(() =>
            {
                Set().Add(application);
                _dbContext.SaveChanges();
            }, cancellationToken);
        }

        public Task DeleteAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthApplication> FindByClientIdAsync(string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthApplication> FindByIdAsync(string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthApplication>> FindByPostLogoutRedirectUriAsync(string address, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthApplication>> FindByRedirectUriAsync(string address, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<TResult> GetAsync<TState, TResult>(Func<IQueryable<OAuthApplication>, TState, IQueryable<TResult>> query, TState state, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetClientIdAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetClientSecretAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetClientTypeAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetConsentTypeAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetDisplayNameAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetIdAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<string>> GetPermissionsAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<string>> GetPostLogoutRedirectUrisAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<JObject> GetPropertiesAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<string>> GetRedirectUrisAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthApplication> InstantiateAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthApplication>> ListAsync(int? count, int? offset, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<TResult>> ListAsync<TState, TResult>(Func<IQueryable<OAuthApplication>, TState, IQueryable<TResult>> query, TState state, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetClientIdAsync(OAuthApplication application, string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetClientSecretAsync(OAuthApplication application, string secret, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetClientTypeAsync(OAuthApplication application, string type, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetConsentTypeAsync(OAuthApplication application, string type, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetDisplayNameAsync(OAuthApplication application, string name, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetPermissionsAsync(OAuthApplication application, ImmutableArray<string> permissions, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetPostLogoutRedirectUrisAsync(OAuthApplication application, ImmutableArray<string> addresses, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetPropertiesAsync(OAuthApplication application, JObject properties, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetRedirectUrisAsync(OAuthApplication application, ImmutableArray<string> addresses, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(OAuthApplication application, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        private DbSet<OAuthApplication> Set()
        {
            return _dbContext.Set<OAuthApplication>();
        }
    }
}
