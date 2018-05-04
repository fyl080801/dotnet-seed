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
    public class OAuthAuthorizationStore : IOpenIddictAuthorizationStore<OAuthAuthorization>
    {
        public Task<long> CountAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<long> CountAsync<TResult>(Func<IQueryable<OAuthAuthorization>, IQueryable<TResult>> query, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task CreateAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthAuthorization>> FindAsync(string subject, string client, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthAuthorization>> FindAsync(string subject, string client, string status, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthAuthorization>> FindAsync(string subject, string client, string status, string type, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthAuthorization> FindByIdAsync(string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthAuthorization>> FindBySubjectAsync(string subject, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetApplicationIdAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<TResult> GetAsync<TState, TResult>(Func<IQueryable<OAuthAuthorization>, TState, IQueryable<TResult>> query, TState state, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetIdAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<JObject> GetPropertiesAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<string>> GetScopesAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetStatusAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetSubjectAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetTypeAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthAuthorization> InstantiateAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthAuthorization>> ListAsync(int? count, int? offset, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<TResult>> ListAsync<TState, TResult>(Func<IQueryable<OAuthAuthorization>, TState, IQueryable<TResult>> query, TState state, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthAuthorization>> ListInvalidAsync(int? count, int? offset, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetApplicationIdAsync(OAuthAuthorization authorization, string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetPropertiesAsync(OAuthAuthorization authorization, JObject properties, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetScopesAsync(OAuthAuthorization authorization, ImmutableArray<string> scopes, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetStatusAsync(OAuthAuthorization authorization, string status, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetSubjectAsync(OAuthAuthorization authorization, string subject, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetTypeAsync(OAuthAuthorization authorization, string type, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(OAuthAuthorization authorization, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
