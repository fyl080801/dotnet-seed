using Microsoft.AspNetCore.Identity;
using Seed.Data;
using Seed.Security;
using Seed.Security.Services;
using SeedModules.Security.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SeedModules.Security.Users
{
    public class UserStore :
        IUserStore<IUser>,
        IUserRoleStore<IUser>,
        IUserPasswordStore<IUser>,
        IUserEmailStore<IUser>,
        IUserSecurityStampStore<IUser>
    {
        readonly IDbContext _dbContext;
        readonly IRoleProvider _roleProvider;
        readonly IRoleClaimStore<IRole> _roleClaimStore;
        readonly ILookupNormalizer _keyNormalizer;

        public UserStore(
            IDbContext dbContext,
            IRoleProvider roleProvider,
            IRoleClaimStore<IRole> roleClaimStore,
            ILookupNormalizer keyNormalizer)
        {
            _dbContext = dbContext;
            _roleProvider = roleProvider;
            _roleClaimStore = roleClaimStore;
            _keyNormalizer = keyNormalizer;
        }

        private string NormalizeKey(string key)
        {
            return _keyNormalizer == null ? key : _keyNormalizer.Normalize(key);
        }

        public async Task AddToRoleAsync(IUser user, string roleName, CancellationToken cancellationToken)
        {
            var rolenames = await _roleProvider.GetRoleNamesAsync();
            var normalRolename = rolenames?.FirstOrDefault(e => NormalizeKey(e) == roleName);

            if (string.IsNullOrWhiteSpace(normalRolename))
            {
                throw new InvalidOperationException($"角色 {normalRolename} 不存在.");
            }

            var olduser = _dbContext.Set<User>().Find(((User)user).Id);
            var role = (Role)(await _roleClaimStore.FindByNameAsync(normalRolename, cancellationToken));
            if (olduser.Roles.Count(e => e.Role.Id == role.Id) <= 0)
            {
                olduser.Roles.Add(new UserRole()
                {
                    UserId = olduser.Id,
                    RoleId = role.Id
                });
            }
            _dbContext.SaveChanges();
        }

        public Task<IdentityResult> CreateAsync(IUser user, CancellationToken cancellationToken)
        {
            var newuser = (User)user;
            _dbContext.Set<User>().Add(newuser);
            _dbContext.SaveChanges();

            return Task.FromResult(IdentityResult.Success);
        }

        public Task<IdentityResult> DeleteAsync(IUser user, CancellationToken cancellationToken)
        {
            var userSet = _dbContext.Set<User>();
            var olduser = userSet.Find(((User)user).Id);
            userSet.Remove(olduser);
            _dbContext.SaveChanges();

            return Task.FromResult(IdentityResult.Success);
        }

        public void Dispose()
        {

        }

        public Task<IUser> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            var query = _dbContext.Set<User>().FirstOrDefault(e => e.NormalizedEmail == normalizedEmail);
            return Task.FromResult<IUser>(query);
        }

        public Task<IUser> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            var user = _dbContext.Set<User>().Find(Convert.ToInt32(userId));
            return Task.FromResult<IUser>(user);
        }

        public Task<IUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            var query = _dbContext.Set<User>().FirstOrDefault(e => e.Username == normalizedUserName);
            return Task.FromResult<IUser>(query);
        }

        public Task<string> GetEmailAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(((User)user).Email);
        }

        public Task<bool> GetEmailConfirmedAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(((User)user).EmailConfirmed);
        }

        public Task<string> GetNormalizedEmailAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(((User)user).NormalizedEmail);
        }

        public Task<string> GetNormalizedUserNameAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(((User)user).NormalizedUsername);
        }

        public Task<string> GetPasswordHashAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(((User)user).PasswordHash);
        }

        public async Task<IList<string>> GetRolesAsync(IUser user, CancellationToken cancellationToken)
        {
            var userId = await this.GetUserIdAsync(user, cancellationToken);
            var userRoles = _dbContext.Set<UserRole>().Where(e => e.UserId == int.Parse(userId)).Select(e => e.RoleId).ToArray();
            var roles = _dbContext.Set<Role>().Where(e => userRoles.Contains(e.Id));
            return roles.Select(e => e.Rolename).ToList();
        }

        public Task<string> GetSecurityStampAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(((User)user).SecurityStamp);
        }

        public Task<string> GetUserIdAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(((User)user).Id.ToString());
        }

        public Task<string> GetUserNameAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username);
        }

        public Task<IList<IUser>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken)
        {
            var role = _dbContext.Set<Role>().FirstOrDefault(e => e.Rolename == roleName);
            var user = _dbContext.Set<User>();
            if (role == null)
            {
                throw new Exception($"找不到角色：{roleName}");
            }
            return Task.FromResult<IList<IUser>>(user.Where(e => e.Roles.Select(r => r.RoleId).Contains(role.Id)).Select(e => (IUser)e).ToList());
        }

        public Task<bool> HasPasswordAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(((User)user).PasswordHash != null);
        }

        public Task<bool> IsInRoleAsync(IUser user, string roleName, CancellationToken cancellationToken)
        {
            var count = ((User)user).Roles.Count(e => e.Role.Rolename == roleName);
            return Task.FromResult(count > 0);
        }

        public Task RemoveFromRoleAsync(IUser user, string roleName, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(((User)user).Id);
            var userrole = exuser.Roles.FirstOrDefault(e => e.Role.Rolename == roleName);
            exuser.Roles.Remove(userrole);
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task SetEmailAsync(IUser user, string email, CancellationToken cancellationToken)
        {
            var exuser = (User)user;
            exuser.Email = email;
            return Task.CompletedTask;
        }

        public Task SetEmailConfirmedAsync(IUser user, bool confirmed, CancellationToken cancellationToken)
        {
            var exuser = (User)user;
            exuser.EmailConfirmed = confirmed;
            return Task.CompletedTask;
        }

        public Task SetNormalizedEmailAsync(IUser user, string normalizedEmail, CancellationToken cancellationToken)
        {
            var exuser = (User)user;
            exuser.NormalizedEmail = normalizedEmail;
            return Task.CompletedTask;
        }

        public Task SetNormalizedUserNameAsync(IUser user, string normalizedName, CancellationToken cancellationToken)
        {
            var exuser = (User)user;
            exuser.NormalizedUsername = normalizedName;
            return Task.CompletedTask;
        }

        public Task SetPasswordHashAsync(IUser user, string passwordHash, CancellationToken cancellationToken)
        {
            var exuser = (User)user;
            exuser.PasswordHash = passwordHash;
            return Task.CompletedTask;
        }

        public Task SetSecurityStampAsync(IUser user, string stamp, CancellationToken cancellationToken)
        {
            var exuser = (User)user;
            exuser.SecurityStamp = stamp;
            return Task.CompletedTask;
        }

        public Task SetUserNameAsync(IUser user, string userName, CancellationToken cancellationToken)
        {
            var exuser = (User)user;
            exuser.Username = userName;
            return Task.CompletedTask;
        }

        public Task<IdentityResult> UpdateAsync(IUser user, CancellationToken cancellationToken)
        {
            _dbContext.Context.Update((User)user);
            _dbContext.SaveChanges();
            return Task.FromResult(IdentityResult.Success);
        }
    }
}
