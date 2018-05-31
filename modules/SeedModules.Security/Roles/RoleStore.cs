using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Data;
using Seed.Environment.Caching;
using Seed.Environment.Engine.Extensions;
using Seed.Security;
using Seed.Security.Services;
using SeedModules.Security.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace SeedModules.Security.Roles
{
    public class RoleStore : IRoleClaimStore<IRole>, IRoleProvider
    {
        private const string Key = "RolesManager.Roles";

        readonly IDbContext _dbContext;
        readonly ISignal _signal;
        readonly IMemoryCache _memoryCache;
        readonly IServiceProvider _serviceProvider;
        readonly ILogger _logger;

        public RoleStore(
            IDbContext dbContext,
            ISignal signal,
            IMemoryCache memoryCache,
            IServiceProvider serviceProvider,
            ILogger<RoleStore> logger)
        {
            _dbContext = dbContext;
            _signal = signal;
            _memoryCache = memoryCache;
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public void Dispose()
        {

        }

        public Task<IdentityResult> CreateAsync(IRole role, CancellationToken cancellationToken)
        {
            _dbContext.Set<Role>().Add((Role)role);
            _dbContext.SaveChanges();
            ReleaseRoles();
            return Task.FromResult(IdentityResult.Success);
        }

        public async Task<IdentityResult> DeleteAsync(IRole role, CancellationToken cancellationToken)
        {
            var set = _dbContext.Set<Role>();
            var oldrole = set.Find(((Role)role).Id);
            set.Remove(oldrole);

            var roleRemovedEventHandlers = _serviceProvider.GetRequiredService<IEnumerable<IRoleRemovedEventHandler>>();
            await roleRemovedEventHandlers.InvokeAsync(x => x.RoleRemovedAsync(oldrole.Rolename), _logger);

            _dbContext.SaveChanges();
            ReleaseRoles();
            return IdentityResult.Success;
        }

        public async Task<IRole> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            return (await GetRolesAsync()).FirstOrDefault(r => GetRoleIdAsync(r, cancellationToken).GetAwaiter().GetResult() == roleId);
        }

        public async Task<IRole> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            return (await GetRolesAsync()).FirstOrDefault(r => GetNormalizedRoleNameAsync(r, cancellationToken).GetAwaiter().GetResult() == normalizedRoleName);
        }

        public Task<string> GetNormalizedRoleNameAsync(IRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(((Role)role).NormalizedRolename);
        }

        public Task<string> GetRoleIdAsync(IRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(((Role)role).Id.ToString());
        }

        public Task<string> GetRoleNameAsync(IRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Rolename);
        }

        public async Task<IEnumerable<string>> GetRoleNamesAsync()
        {
            return (await GetRolesAsync()).Select(e => e.Rolename).ToArray();
        }

        public Task SetNormalizedRoleNameAsync(IRole role, string normalizedName, CancellationToken cancellationToken)
        {
            ((Role)role).NormalizedRolename = normalizedName;
            return Task.CompletedTask;
        }

        public Task SetRoleNameAsync(IRole role, string roleName, CancellationToken cancellationToken)
        {
            ((Role)role).Rolename = roleName;
            return Task.CompletedTask;
        }

        public Task<IdentityResult> UpdateAsync(IRole role, CancellationToken cancellationToken)
        {
            _dbContext.Context.Update((Role)role);
            _dbContext.SaveChanges();
            ReleaseRoles();
            return Task.FromResult(IdentityResult.Success);
        }

        public async Task<IEnumerable<IRole>> GetRolesAsync()
        {
            // 同一租户环境下角色数据进行缓存
            return await _memoryCache.GetOrCreateAsync(Key, async (entry) =>
            {
                var roles = await Task.FromResult(_dbContext.Set<Role>().Select(e => (IRole)e).ToArray().AsEnumerable());

                entry.ExpirationTokens.Add(_signal.GetToken(Key));

                return roles;
            });
        }

        //
        public Task AddClaimAsync(IRole role, Claim claim, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            if (claim == null)
            {
                throw new ArgumentNullException(nameof(claim));
            }

            ((Role)role).RoleClaims.Add(new RoleClaim { ClaimType = claim.Type, ClaimValue = claim.Value });

            return Task.CompletedTask;
        }

        public async Task<IList<Claim>> GetClaimsAsync(IRole role, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            var roleId = await this.GetRoleIdAsync(role, cancellationToken);
            var claims = _dbContext.Set<RoleClaim>().Where(e => e.RoleId == int.Parse(roleId));

            return claims.Select(x => x.ToClaim()).ToList();
        }

        public Task RemoveClaimAsync(IRole role, Claim claim, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (role == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            if (claim == null)
            {
                throw new ArgumentNullException(nameof(claim));
            }

            ((Role)role).RoleClaims.RemoveAll(x => x.ClaimType == claim.Type && x.ClaimValue == claim.Value);

            return Task.CompletedTask;
        }

        private void ReleaseRoles()
        {
            _memoryCache.Remove(Key);
        }
    }
}
