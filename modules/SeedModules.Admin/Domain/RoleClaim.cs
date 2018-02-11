using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Text;

namespace SeedModules.Admin.Domain
{
    [Table("RoleClaim")]
    public class RoleClaim
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string ClaimType { get; set; }

        [StringLength(500)]
        public string ClaimValue { get; set; }

        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }

        public Claim ToClaim()
        {
            return new Claim(ClaimType, ClaimValue);
        }
    }

    public class RoleClaimTypeConfiguration : IEntityTypeConfiguration<RoleClaim>
    {
        public void Configure(EntityTypeBuilder<RoleClaim> builder)
        {

        }
    }
}
