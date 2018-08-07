using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenIddict.EntityFrameworkCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.OpenId.Domain
{
    public class OpenIdScopeTypeConfiguration : IEntityTypeConfiguration<OpenIddictScope>
    {
        public void Configure(EntityTypeBuilder<OpenIddictScope> builder)
        {
            builder.HasKey(scope => scope.Id);

            builder.HasIndex(scope => scope.Name)
                .IsUnique();

            builder.Property(scope => scope.ConcurrencyToken)
                .IsConcurrencyToken();

            builder.Property(scope => scope.Name)
                .HasMaxLength(255)
                .IsRequired();

            builder.ToTable("OpenIdScopes");
        }
    }
}
