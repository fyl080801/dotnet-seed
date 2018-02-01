using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Settings.Domain
{
    public class SiteSettingsConfiguration : IEntityTypeConfiguration<SiteSettings>
    {
        public void Configure(EntityTypeBuilder<SiteSettings> builder)
        {

        }
    }
}
