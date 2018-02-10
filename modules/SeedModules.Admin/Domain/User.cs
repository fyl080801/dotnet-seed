using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeedModules.Admin.Abstractions;
using SeedModules.Admin.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SeedModules.Admin.Domain
{
    [Table("User")]
    public class User : IUser
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Username { get; set; }

        [StringLength(20)]
        public string NormalizedUserName { get; set; }

        [Required]
        [StringLength(200)]
        public string Email { get; set; }

        [StringLength(200)]
        public string NormalizedEmail { get; set; }

        [StringLength(500)]
        public string PasswordHash { get; set; }

        [StringLength(500)]
        public string SecurityStamp { get; set; }

        public bool EmailConfirmed { get; set; }

        public IList<string> RoleNames { get; set; } = new List<string>();

        public override string ToString()
        {
            return Username;
        }
    }

    public class UserTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {

        }
    }
}
