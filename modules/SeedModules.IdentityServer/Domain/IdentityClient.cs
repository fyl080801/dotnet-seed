using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeedModules.IdentityServer.Domain
{
    [Table("IdentityClient")]
    public class IdentityClient
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100), Required]
        public string ClientName { get; set; }

        public string LogoUri { get; set; }
    }

    public class IdentityClientTypeConfiguration : IEntityTypeConfiguration<IdentityClient>
    {
        public void Configure(EntityTypeBuilder<IdentityClient> builder)
        {

        }
    }
}
