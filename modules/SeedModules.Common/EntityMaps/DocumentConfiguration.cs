using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Common.EntityMaps
{
    public class DocumentConfiguration : IEntityTypeConfiguration<Document>
    {
        public void Configure(EntityTypeBuilder<Document> builder)
        {

        }
    }
}
