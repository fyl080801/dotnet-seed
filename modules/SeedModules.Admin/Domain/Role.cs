using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Security;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SeedModules.Admin.Domain
{
    [Table("Role")]
    public class Role : IRole
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string Rolename { get; set; }

        [StringLength(50)]
        public string NormalizedRolename { get; set; }

        public virtual List<RoleClaim> RoleClaims { get; } = new List<RoleClaim>();
    }

    public class RoleTypeConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {

        }
    }
}
