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
    public class OAuthTokenStore : IOpenIddictTokenStore<OAuthToken>
    {
        public Task<long> CountAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<long> CountAsync<TResult>(Func<IQueryable<OAuthToken>, IQueryable<TResult>> query, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task CreateAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthToken>> FindByApplicationIdAsync(string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthToken>> FindByAuthorizationIdAsync(string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthToken> FindByIdAsync(string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthToken> FindByReferenceIdAsync(string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthToken>> FindBySubjectAsync(string subject, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetApplicationIdAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<TResult> GetAsync<TState, TResult>(Func<IQueryable<OAuthToken>, TState, IQueryable<TResult>> query, TState state, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetAuthorizationIdAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<DateTimeOffset?> GetCreationDateAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<DateTimeOffset?> GetExpirationDateAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetIdAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetPayloadAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<JObject> GetPropertiesAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetReferenceIdAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetStatusAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetSubjectAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetTokenTypeAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<OAuthToken> InstantiateAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthToken>> ListAsync(int? count, int? offset, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<TResult>> ListAsync<TState, TResult>(Func<IQueryable<OAuthToken>, TState, IQueryable<TResult>> query, TState state, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ImmutableArray<OAuthToken>> ListInvalidAsync(int? count, int? offset, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetApplicationIdAsync(OAuthToken token, string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetAuthorizationIdAsync(OAuthToken token, string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetCreationDateAsync(OAuthToken token, DateTimeOffset? date, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetExpirationDateAsync(OAuthToken token, DateTimeOffset? date, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetPayloadAsync(OAuthToken token, string payload, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetPropertiesAsync(OAuthToken token, JObject properties, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetReferenceIdAsync(OAuthToken token, string identifier, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetStatusAsync(OAuthToken token, string status, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetSubjectAsync(OAuthToken token, string subject, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetTokenTypeAsync(OAuthToken token, string type, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(OAuthToken token, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
