using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using OpenIddict;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.OpenId.Services
{
    public class OpenIdConfiguration
        : IConfigureOptions<AuthenticationOptions>, IConfigureNamedOptions<OpenIddictOptions>, IConfigureNamedOptions<JwtBearerOptions>, IConfigureNamedOptions<OAuthValidationOptions>
    {
        public void Configure(AuthenticationOptions options)
        {
            throw new NotImplementedException();
        }

        public void Configure(string name, OpenIddictOptions options)
        {
            throw new NotImplementedException();
        }

        public void Configure(OpenIddictOptions options)
        {
            throw new NotImplementedException();
        }

        public void Configure(string name, JwtBearerOptions options)
        {
            throw new NotImplementedException();
        }

        public void Configure(JwtBearerOptions options)
        {
            throw new NotImplementedException();
        }

        public void Configure(string name, OAuthValidationOptions options)
        {
            throw new NotImplementedException();
        }

        public void Configure(OAuthValidationOptions options)
        {
            throw new NotImplementedException();
        }
    }
}
