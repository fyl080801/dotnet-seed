using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;

namespace SeedModules.Security.Domain
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
