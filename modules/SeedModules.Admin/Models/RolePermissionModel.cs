using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Seed.Security.Permissions;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Models
{
    public class RolePermissionModel
    {
        public IEnumerable<string> Enables { get; set; }

        public IDictionary<string, IEnumerable<PermissionInfo>> Permissions { get; set; }
    }
}