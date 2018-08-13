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
    [Table("TemplateDefine")]
    public class TemplateDefine : JEntity
    {
        [Key]
        public int Id { get; set; }

        public BuilderDefineTypes Type { get; set; }

        [JsonIgnore]
        public string Define { get; set; }

        public DateTime LastModify { get; set; } = DateTime.Now;

        public DateTime CreateTime { get; set; } = DateTime.Now;

        public int TemplateId { get; set; }

        [ForeignKey("TemplateId")]
        public virtual BuilderTemplate Template { get; set; }

        [NotMapped]
        public override JObject Properties
        {
            get { return !string.IsNullOrEmpty(this.Define) ? JObject.Parse(this.Define) : new JObject(); }
            set { this.Define = value.ToString(); }
        }
    }

    public class TemplateDefineTypeConfiguration : IEntityTypeConfiguration<TemplateDefine>
    {
        public void Configure(EntityTypeBuilder<TemplateDefine> builder)
        {

        }
    }
}