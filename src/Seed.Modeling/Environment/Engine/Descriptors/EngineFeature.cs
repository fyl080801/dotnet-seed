using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Seed.Environment.Engine.Descriptors
{
    public class EngineFeature
    {
        public EngineFeature()
        {

        }

        public EngineFeature(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
    }

    public class EngineFeatureEntityConfiguration : IEntityTypeConfiguration<EngineFeature>
    {
        public void Configure(EntityTypeBuilder<EngineFeature> builder)
        {

        }
    }
}
