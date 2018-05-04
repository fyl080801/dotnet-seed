using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using OpenIddict;
using Seed.Modules;
using SeedModules.OAuth.Domain;
using SeedModules.OAuth.Stores;
using System;

namespace SeedModules.OAuth
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddOpenIddict<OAuthApplication, OAuthAuthorization, OAuthScope, OAuthToken>()
                .AddApplicationStore<OAuthApplicationStore>()
                .AddAuthorizationStore<OAuthAuthorizationStore>()
                .AddScopeStore<OAuthScopeStore>()
                .AddTokenStore<OAuthTokenStore>();

            services.TryAddScoped<OpenIddictHandler>();
            services.TryAddScoped<OpenIddictProvider<OAuthApplication, OAuthAuthorization, OAuthScope, OAuthToken>>();
        }
    }
}
