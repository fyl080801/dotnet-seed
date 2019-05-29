using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace SeedCore.MemberShip.Security
{
    public class ApiAuthenticationHandler : AuthenticationHandler<ApiAuthorizationOptions>
    {
        private readonly IOptions<AuthenticationOptions> _authenticationOptions;

        public ApiAuthenticationHandler(
            IOptions<AuthenticationOptions> authenticationOptions,
            IOptionsMonitor<ApiAuthorizationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
            _authenticationOptions = authenticationOptions;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!_authenticationOptions.Value.SchemeMap.ContainsKey("Bearer"))
            {
                return AuthenticateResult.NoResult();
            }

            return await Context.AuthenticateAsync("Bearer");
        }
    }

    public class ApiAuthorizationOptions : AuthenticationSchemeOptions
    {
    }
}