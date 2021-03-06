﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Security;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeedModules.Security.Domain
{
    [Table("Role")]
    public class Role : IRole
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50), Required]
        public string Rolename { get; set; }

        [StringLength(50)]
        public string NormalizedRolename { get; set; }

        [StringLength(50)]
        public string DisplayName { get; set; }

        public virtual List<RoleClaim> RoleClaims { get; } = new List<RoleClaim>();

        public virtual List<UserRole> Users { get; set; } = new List<UserRole>();

        public Role() { }

        public Role(string rolename)
        {
            Rolename = rolename;
        }
    }

    public class RoleTypeConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasAlternateKey(e => e.Rolename);
        }
    }
}
