using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Security.Permissions
{
    public interface IPermissionProvider
    {
        IEnumerable<PermissionInfo> GetPermissions();

        IEnumerable<PermissionStereotype> GetDefaultStereotypes();
    }
}