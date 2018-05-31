using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenIddict.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.OpenId.Domain
{
    public class OpenIdAuthorizationTypeConfiguration : IEntityTypeConfiguration<OpenIddictAuthorization>
    {
        public void Configure(EntityTypeBuilder<OpenIddictAuthorization> builder)
        {
            builder.HasKey(authorization => authorization.Id);

            builder.Property(authorization => authorization.ConcurrencyToken)
                .IsConcurrencyToken();

            builder.Property(authorization => authorization.Status)
                .IsRequired();

            builder.Property(authorization => authorization.Subject)
                .IsRequired();

            builder.Property(authorization => authorization.Type)
                .IsRequired();

            builder.HasMany(authorization => authorization.Tokens)
                .WithOne(token => token.Authorization)
                .HasForeignKey("AuthorizationId")
                .IsRequired(required: false)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("OpenIdAuthorizations");
        }
    }
}
