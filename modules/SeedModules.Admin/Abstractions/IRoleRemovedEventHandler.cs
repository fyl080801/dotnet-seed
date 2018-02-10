using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Admin.Abstractions
{
    public interface IRoleRemovedEventHandler
    {
        Task RoleRemovedAsync(string rolename);
    }
}
