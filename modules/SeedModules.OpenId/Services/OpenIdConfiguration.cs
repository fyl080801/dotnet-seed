using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Options;
using OpenIddict;
using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.OpenId.Services
{
    public class OpenIdConfiguration
        : IConfigureOptions<AuthenticationOptions>, IConfigureNamedOptions<OpenIddictOptions>, IConfigureNamedOptions<JwtBearerOptions>, IConfigureNamedOptions<OAuthValidationOptions>
    {
        readonly IDataProtectionProvider _dataProtectionProvider;

        public OpenIdConfiguration(IDataProtectionProvider dataProtectionProvider, EngineSettings settings)
        {
            _dataProtectionProvider = dataProtectionProvider.CreateProtector(settings.Name);
        }

        public void Configure(AuthenticationOptions options)
        {

        }

        public void Configure(string name, OpenIddictOptions options)
        {

        }

        public void Configure(OpenIddictOptions options)
        {

        }

        public void Configure(string name, JwtBearerOptions options)
        {

        }

        public void Configure(JwtBearerOptions options)
        {

        }

        public void Configure(string name, OAuthValidationOptions options)
        {

        }

        public void Configure(OAuthValidationOptions options)
        {

        }
    }
}
