using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Seed.Security.Services;
using Seed.Data;
using SeedModules.Admin.Domain;
using System.Collections.ObjectModel;

namespace SeedModules.Admin.Users
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
        readonly ILookupNormalizer _keyNormalizer;

        public UserStore(
            IDbContext dbContext,
            IRoleProvider roleProvider,
            ILookupNormalizer keyNormalizer)
        {
            _dbContext = dbContext;
            _roleProvider = roleProvider;
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

            var olduser = _dbContext.Set<User>().Find(user.Id);
            var exRoles = rolenames.Intersect(olduser.RoleNames).ToList();
            exRoles.Add(normalRolename);
            olduser.RoleNames = new ObservableCollection<string>(exRoles);
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
            var olduser = userSet.Find(user.Id);
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
            var exuser = _dbContext.Set<User>().Find(user.Id);
            return Task.FromResult(exuser.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(IUser user, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            return Task.FromResult(exuser.EmailConfirmed);
        }

        public Task<string> GetNormalizedEmailAsync(IUser user, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            return Task.FromResult(exuser.NormalizedEmail);
        }

        public Task<string> GetNormalizedUserNameAsync(IUser user, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            return Task.FromResult(exuser.NormalizedUsername);
        }

        public Task<string> GetPasswordHashAsync(IUser user, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            return Task.FromResult(exuser.PasswordHash);
        }

        public Task<IList<string>> GetRolesAsync(IUser user, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            return Task.FromResult<IList<string>>(exuser.RoleNames.ToList());
        }

        public Task<string> GetSecurityStampAsync(IUser user, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            return Task.FromResult(exuser.SecurityStamp);
        }

        public Task<string> GetUserIdAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Id.ToString());
        }

        public Task<string> GetUserNameAsync(IUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username);
        }

        public Task<IList<IUser>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken)
        {
            var query = _dbContext.Set<User>().Where(e => e.Roles.Contains("," + roleName + ","))
                .Select(e => e as IUser)
                .ToList();
            return Task.FromResult<IList<IUser>>(query);
        }

        public Task<bool> HasPasswordAsync(IUser user, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            return Task.FromResult(exuser.PasswordHash != null);
        }

        public Task<bool> IsInRoleAsync(IUser user, string roleName, CancellationToken cancellationToken)
        {
            var count = _dbContext.Set<User>().Count(e => e.Roles.Contains(roleName));
            return Task.FromResult(count > 0);
        }

        public Task RemoveFromRoleAsync(IUser user, string roleName, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            exuser.RoleNames.Remove(roleName);
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task SetEmailAsync(IUser user, string email, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            exuser.Email = email;
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task SetEmailConfirmedAsync(IUser user, bool confirmed, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            exuser.EmailConfirmed = confirmed;
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task SetNormalizedEmailAsync(IUser user, string normalizedEmail, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            exuser.NormalizedEmail = normalizedEmail;
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task SetNormalizedUserNameAsync(IUser user, string normalizedName, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            exuser.NormalizedUsername = normalizedName;
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task SetPasswordHashAsync(IUser user, string passwordHash, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            exuser.PasswordHash = passwordHash;
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task SetSecurityStampAsync(IUser user, string stamp, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            exuser.SecurityStamp = stamp;
            _dbContext.SaveChanges();
            return Task.CompletedTask;
        }

        public Task SetUserNameAsync(IUser user, string userName, CancellationToken cancellationToken)
        {
            var exuser = _dbContext.Set<User>().Find(user.Id);
            exuser.Username = userName;
            _dbContext.SaveChanges();
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
