using System.Collections.Generic;
using Seed.Security.Permissions;

namespace SeedModules.Mvc
{
    public class Permissions : IPermissionProvider
    {
        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<PermissionInfo> GetPermissions()
        {
            throw new System.NotImplementedException();
        }
    }
}