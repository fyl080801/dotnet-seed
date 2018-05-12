
using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using OpenIddict.Models;
using Seed.Data;
using Seed.Modules;

namespace SeedModules.OpenId
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();

            services.AddOpenIddict<OpenIddictApplication, OpenIddictAuthorization, OpenIddictScope, OpenIddictToken>()
                .AddApplicationStore<OpenIddictApplicationStore>()
                .AddAuthorizationStore<OpenIddictAuthorizationStore>()
                .AddScopeStore<OpenIddictScopeStore>()
                .AddTokenStore<OpenIddictTokenStore>();

            services.TryAddScoped<OpenIddictHandler>();
            services.TryAddScoped<OpenIddictProvider<OpenIddictApplication, OpenIddictAuthorization, OpenIddictScope, OpenIddictToken>>();

            services.TryAddEnumerable(new[]
            {
                ServiceDescriptor.Transient<IConfigureOptions<AuthenticationOptions>, OpenIdConfiguration>(),
                ServiceDescriptor.Transient<IConfigureOptions<OpenIddictOptions>, OpenIdConfiguration>(),
                ServiceDescriptor.Transient<IConfigureOptions<JwtBearerOptions>, OpenIdConfiguration>(),
                ServiceDescriptor.Transient<IConfigureOptions<OAuthValidationOptions>, OpenIdConfiguration>(),

                ServiceDescriptor.Transient<IPostConfigureOptions<JwtBearerOptions>, JwtBearerPostConfigureOptions>(),
                ServiceDescriptor.Transient<IPostConfigureOptions<OAuthValidationOptions>, OAuthValidationInitializer>(),
                ServiceDescriptor.Transient<IPostConfigureOptions<OpenIddictOptions>, OpenIddictInitializer>(),
                ServiceDescriptor.Transient<IPostConfigureOptions<OpenIddictOptions>, OpenIdConnectServerInitializer>()
            });
        }
    }
}
