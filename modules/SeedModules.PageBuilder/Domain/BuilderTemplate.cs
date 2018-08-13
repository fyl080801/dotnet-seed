using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Data;

namespace SeedModules.PageBuilder.Domain
{
    [Table("BuilderTemplate")]
    public class BuilderTemplate
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        public string Description { get; set; }
    }

    public class BuilderTemplateTypeConfiguration : IEntityTypeConfiguration<BuilderTemplate>
    {
        public void Configure(EntityTypeBuilder<BuilderTemplate> builder)
        {

        }
    }
}