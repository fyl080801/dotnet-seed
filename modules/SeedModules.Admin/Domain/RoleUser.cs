using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SeedModules.Admin.Domain
{
    [Table("RoleUser")]
    public class RoleUser
    {
        [Key]
        public int RoleId { get; set; }

        public virtual Role Role { get; set; }

        [Key]
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
