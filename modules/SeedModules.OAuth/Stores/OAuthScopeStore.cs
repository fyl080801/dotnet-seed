using Newtonsoft.Json.Linq;
using OpenIddict.Core;
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
    public class OAuthScopeStore : IOpenIddictScopeStore<OAuthScope>
    {
        public Task<long> CountAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<long> CountAsync<TResult>(Func<IQueryable<OAuthScope>, IQueryable<TResult>> query, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task CreateAsync(OAuthScope scope, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(OAuthScope scope, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthScope> FindByIdAsync(string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthScope> FindByNameAsync(string name, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthScope>> FindByNamesAsync(ImmutableArray<string> names, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<TResult> GetAsync<TState, TResult>(Func<IQueryable<OAuthScope>, TState, IQueryable<TResult>> query, TState state, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetDescriptionAsync(OAuthScope scope, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetDisplayNameAsync(OAuthScope scope, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetIdAsync(OAuthScope scope, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetNameAsync(OAuthScope scope, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<JObject> GetPropertiesAsync(OAuthScope scope, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<string>> GetResourcesAsync(OAuthScope scope, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthScope> InstantiateAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthScope>> ListAsync(int? count, int? offset, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<TResult>> ListAsync<TState, TResult>(Func<IQueryable<OAuthScope>, TState, IQueryable<TResult>> query, TState state, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetDescriptionAsync(OAuthScope scope, string description, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetDisplayNameAsync(OAuthScope scope, string name, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetNameAsync(OAuthScope scope, string name, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetPropertiesAsync(OAuthScope scope, JObject properties, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetResourcesAsync(OAuthScope scope, ImmutableArray<string> resources, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(OAuthScope scope, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
