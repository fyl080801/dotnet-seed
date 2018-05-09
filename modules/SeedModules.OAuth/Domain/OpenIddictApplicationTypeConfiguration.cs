﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenIddict.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.OAuth.Domain
{
    public class OpenIddictApplicationTypeConfiguration : IEntityTypeConfiguration<OpenIddictApplication>
    {
        public void Configure(EntityTypeBuilder<OpenIddictApplication> builder)
        {
            builder.HasKey(application => application.Id);

            builder.HasIndex(application => application.ClientId)
                  .IsUnique();

            builder.Property(application => application.ClientId)
                  .IsRequired();

            builder.Property(application => application.ConcurrencyToken)
                  .IsConcurrencyToken();

            builder.Property(application => application.Type)
                  .IsRequired();

            builder.HasMany(application => application.Authorizations)
                  .WithOne(authorization => authorization.Application)
                  .HasForeignKey("ApplicationId")
                  .IsRequired(required: false);

            builder.HasMany(application => application.Tokens)
                  .WithOne(token => token.Application)
                  .HasForeignKey("ApplicationId")
                  .IsRequired(required: false);

            builder.ToTable("OpenIddictApplications");
        }
    }
}
