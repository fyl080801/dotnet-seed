using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;

namespace SeedModules.OAuth
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultChallengeScheme = OAuthDefaults.DisplayName;
            })
            .AddOAuth(OAuthDefaults.DisplayName, options =>
            {

            });
        }
    }
}
