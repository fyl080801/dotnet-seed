using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Modules;
using System;

namespace SeedModules.OpenId
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();

            //services.AddOpenIddict<OAuthApplication, OAuthAuthorization, OAuthScope, OAuthToken>()
            //    .AddApplicationStore<OAuthApplicationStore>()
            //    .AddAuthorizationStore<OAuthAuthorizationStore>()
            //    .AddScopeStore<OAuthScopeStore>()
            //    .AddTokenStore<OAuthTokenStore>();

            //services.TryAddScoped<OpenIddictHandler>();
            //services.TryAddScoped<OpenIddictProvider<OAuthApplication, OAuthAuthorization, OAuthScope, OAuthToken>>();
        }
    }
}
