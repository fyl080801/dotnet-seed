using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Models
{
    public class RoleMembersModel
    {
        public IEnumerable<int> Members { get; set; }
    }
}