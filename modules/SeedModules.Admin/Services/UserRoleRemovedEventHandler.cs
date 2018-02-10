using SeedModules.Admin.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Admin.Services
{
    public class UserRoleRemovedEventHandler : IRoleRemovedEventHandler
    {
        public Task RoleRemovedAsync(string rolename)
        {
            throw new NotImplementedException();
        }
    }
}