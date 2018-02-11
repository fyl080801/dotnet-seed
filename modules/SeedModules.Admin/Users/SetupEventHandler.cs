using Seed.Modules.Setup.Events;
using SeedModules.Admin.Users.Services;
using System;
using System.Threading.Tasks;

namespace SeedModules.Admin.Users
{
    public class SetupEventHandler : ISetupEventHandler
    {
        private readonly IUserService _userService;

        public SetupEventHandler(IUserService userService)
        {
            _userService = userService;
        }

        public Task SetupAsync(string siteName, string userName, string email, string password, string dbProvider, string dbConnectionString, string dbTablePrefix, Action<string, string> errors)
        {
            return _userService.CreateUserAsync(userName, email, new string[] { "Administrator" }, password, errors);
        }
    }
}
