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
    [Table("UserRole")]
    public class UserRole
    {
        public int UserId { get; set; }

        public virtual User User { get; set; }

        public int RoleId { get; set; }

        public virtual Role Role { get; set; }
    }

    public class UserRoleTypeConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.HasKey(e => new { e.UserId, e.RoleId });
            builder.HasOne(e => e.User).WithMany(e => e.Roles).HasForeignKey(e => e.UserId);
            builder.HasOne(e => e.Role).WithMany(e => e.Users).HasForeignKey(e => e.RoleId);
        }
    }
}
