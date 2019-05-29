using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using SeedCore.MemberShip.Models;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeedCore.MemberShip.Services
{
    public class UserService : IUserService
    {
        private readonly SignInManager<IUser> _signInManager;
        private readonly UserManager<IUser> _userManager;
        private readonly IOptions<IdentityOptions> _identityOptions;
        private readonly IStringLocalizer<UserService> T;

        public UserService(
            SignInManager<IUser> signInManager,
            UserManager<IUser> userManager,
            IOptions<IdentityOptions> identityOptions,
            IStringLocalizer<UserService> stringLocalizer)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _identityOptions = identityOptions;
            T = stringLocalizer;
        }

        public async Task<IUser> AuthenticateAsync(string userName, string password, Action<string, string> reportError)
        {
            if (string.IsNullOrWhiteSpace(userName))
            {
                reportError("UserName", T["A user name is required."]);
                return null;
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                reportError("Password", T["A password is required."]);
                return null;
            }

            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                reportError(string.Empty, T["The specified username/password couple is invalid."]);
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure: true);
            if (result.IsNotAllowed)
            {
                reportError(string.Empty, T["The specified user is not allowed to sign in."]);
                return null;
            }
            else if (result.RequiresTwoFactor)
            {
                reportError(string.Empty, T["The specified user is not allowed to sign in using password authentication."]);
                return null;
            }
            else if (!result.Succeeded)
            {
                reportError(string.Empty, T["The specified username/password couple is invalid."]);
                return null;
            }

            return user;
        }

        public async Task<IUser> CreateUserAsync(IUser user, string password, Action<string, string> reportError)
        {
            if (!(user is User newUser))
            {
                throw new ArgumentException("Expected a User instance.", nameof(user));
            }

            // Accounts can be created with no password
            var identityResult = String.IsNullOrWhiteSpace(password)
                ? await _userManager.CreateAsync(user)
                : await _userManager.CreateAsync(user, password);
            if (!identityResult.Succeeded)
            {
                ProcessValidationErrors(identityResult.Errors, newUser, reportError);
                return null;
            }

            return user;
        }

        public async Task<bool> ChangePasswordAsync(IUser user, string currentPassword, string newPassword, Action<string, string> reportError)
        {
            var identityResult = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

            if (!identityResult.Succeeded)
            {
                ProcessValidationErrors(identityResult.Errors, (User)user, reportError);
            }

            return identityResult.Succeeded;
        }

        public Task<IUser> GetAuthenticatedUserAsync(ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                return Task.FromResult<IUser>(null);
            }

            return _userManager.GetUserAsync(principal);
        }

        public async Task<IUser> GetForgotPasswordUserAsync(string userIdentifier)
        {
            if (string.IsNullOrWhiteSpace(userIdentifier))
            {
                return await Task.FromResult<IUser>(null);
            }

            var user = await FindByUsernameOrEmailAsync(userIdentifier) as User;

            if (user == null)
            {
                return await Task.FromResult<IUser>(null);
            }

            user.ResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            return user;
        }

        public async Task<bool> ResetPasswordAsync(string userIdentifier, string resetToken, string newPassword, Action<string, string> reportError)
        {
            var result = true;
            if (string.IsNullOrWhiteSpace(userIdentifier))
            {
                reportError("UserName", T["A user name or email is required."]);
                result = false;
            }

            if (string.IsNullOrWhiteSpace(newPassword))
            {
                reportError("Password", T["A password is required."]);
                result = false;
            }

            if (string.IsNullOrWhiteSpace(resetToken))
            {
                reportError("Token", T["A token is required."]);
                result = false;
            }

            if (!result)
            {
                return result;
            }

            var user = await FindByUsernameOrEmailAsync(userIdentifier) as User;

            if (user == null)
            {
                return false;
            }

            var identityResult = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);

            if (!identityResult.Succeeded)
            {
                ProcessValidationErrors(identityResult.Errors, user, reportError);
            }

            return identityResult.Succeeded;
        }

        public Task<ClaimsPrincipal> CreatePrincipalAsync(IUser user)
        {
            if (user == null)
            {
                return Task.FromResult<ClaimsPrincipal>(null);
            }

            return _signInManager.CreateUserPrincipalAsync(user);
        }

        /// <summary>
        /// Gets the user, if any, associated with the normalized value of the specified identifier, which can refer both to username or email
        /// </summary>
        /// <param name="userIdentification">The username or email address to refer to</param>
        private async Task<IUser> FindByUsernameOrEmailAsync(string userIdentifier)
            => await _userManager.FindByNameAsync(userIdentifier) ??
               await _userManager.FindByEmailAsync(userIdentifier);

        public Task<IUser> GetUserAsync(string userName) => _userManager.FindByNameAsync(userName);

        public Task<IUser> GetUserByUniqueIdAsync(string userIdentifier) => _userManager.FindByIdAsync(userIdentifier);

        public void ProcessValidationErrors(IEnumerable<IdentityError> errors, User user, Action<string, string> reportError)
        {
            foreach (var error in errors)
            {
                switch (error.Code)
                {
                    // Password
                    case "PasswordRequiresDigit":
                        reportError("Password", T["Passwords must have at least one digit character ('0'-'9')."]);
                        break;
                    case "PasswordRequiresLower":
                        reportError("Password", T["Passwords must have at least one lowercase character ('a'-'z')."]);
                        break;
                    case "PasswordRequiresUpper":
                        reportError("Password", T["Passwords must have at least one uppercase character ('A'-'Z')."]);
                        break;
                    case "PasswordRequiresNonAlphanumeric":
                        reportError("Password", T["Passwords must have at least one non letter or digit character."]);
                        break;
                    case "PasswordTooShort":
                        reportError("Password", T["Passwords must be at least {0} characters.", _identityOptions.Value.Password.RequiredLength]);
                        break;
                    case "PasswordRequiresUniqueChars":
                        reportError("Password", T["Passwords must contain at least {0} unique characters.", _identityOptions.Value.Password.RequiredUniqueChars]);
                        break;

                    // CurrentPassword
                    case "PasswordMismatch":
                        reportError("CurrentPassword", T["Incorrect password."]);
                        break;

                    // User name
                    case "InvalidUserName":
                        reportError("UserName", T["User name '{0}' is invalid, can only contain letters or digits.", user.UserName]);
                        break;
                    case "DuplicateUserName":
                        reportError("UserName", T["User name '{0}' is already used.", user.UserName]);
                        break;

                    // Email
                    case "InvalidEmail":
                        reportError("Email", T["Email '{0}' is invalid.", user.Email]);
                        break;
                    default:
                        reportError(string.Empty, T["Unexpected error: '{0}'.", error.Code]);
                        break;
                }
            }
        }
    }
}
