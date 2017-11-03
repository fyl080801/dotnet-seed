using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Modules.Account.Permissions
{
    /// <summary>
    /// 权限策略
    /// </summary>
    public class PermissionStereotype
    {
        public string Name { get; set; }

        public IEnumerable<Permission> Permissions { get; set; }
    }
}
