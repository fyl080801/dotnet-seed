using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Seed.Security.Permissions;
using Seed.Environment.Engine.Extensions;
using System.Linq;
using System.Security.Claims;
using Seed.Security.Extensions;

namespace Seed.Security
{
    public class PermissionService : IPermissionService
    {
        readonly IAuthorizationService _authorizationService;
        readonly IEnumerable<IPermissionProvider> _permissionProviders;
        readonly ClaimsPrincipal _principal;
        readonly ILogger _logger;

        public PermissionService(
            IAuthorizationService authorizationService,
            IEnumerable<IPermissionProvider> permissionProviders,
            ClaimsPrincipal principal,
            ILogger<PermissionService> logger)
        {
            _authorizationService = authorizationService;
            _permissionProviders = permissionProviders;
            _principal = principal;
            _logger = logger;
        }

        public Task<bool> CheckPermissionAsync(PermissionInfo permission)
        {
            return _authorizationService.AuthorizeAsync(_principal, permission).Result;
        }

        public async Task<PermissionInfo> GetPermissionAsync(string name)
        {
            var permissions = await _permissionProviders.InvokeAsync(e => GetProviderPermissions(e), _logger);

            var permissionInfo = permissions.FirstOrDefault(e => e.Name == name);

            return permissionInfo;
        }

        private Task<IEnumerable<PermissionInfo>> GetProviderPermissions(IPermissionProvider provider)
        {
            return Task.FromResult(provider.GetPermissions());
        }
    }
}