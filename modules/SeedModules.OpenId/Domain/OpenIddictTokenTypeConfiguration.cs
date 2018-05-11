using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenIddict.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.OpenId.Domain
{
    public class OpenIddictTokenTypeConfiguration : IEntityTypeConfiguration<OpenIddictToken>
    {
        public void Configure(EntityTypeBuilder<OpenIddictToken> builder)
        {
            builder.HasKey(token => token.Id);

            builder.HasIndex(token => token.ReferenceId)
                  .IsUnique();

            builder.Property(token => token.ConcurrencyToken)
                  .IsConcurrencyToken();

            builder.Property(token => token.Subject)
                  .IsRequired();

            builder.Property(token => token.Type)
                  .IsRequired();

            builder.ToTable("OpenIddictTokens");
        }
    }
}
