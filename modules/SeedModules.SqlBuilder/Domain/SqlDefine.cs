using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json.Linq;
using Seed.Data;
using SeedModules.Security.Domain;

namespace SeedModules.SqlBuilder.Domain
{
    [Table("SqlDefine")]
    public class SqlDefine : JEntity
    {
        [Key]
        public int Id { get; set; }

        public string Description { get; set; }

        public string Define { get; set; }

        [StringLength(50)]
        public string Provider { get; set; }

        public int? PathId { get; set; }

        public int? OwnerId { get; set; }

        public DateTime LastModify { get; set; } = DateTime.Now;


        [ForeignKey("PathId")]
        public virtual SqlBuilderPath Path { get; set; }

        [ForeignKey("OwnerId")]
        public virtual User Owner { get; set; }

        [NotMapped]
        public override JObject Properties
        {
            get { return JObject.Parse(this.Define); }
            set { this.Define = value.ToString(); }
        }
    }

    public class SqlDefineTypeConfiguration : IEntityTypeConfiguration<SqlDefine>
    {
        public void Configure(EntityTypeBuilder<SqlDefine> builder)
        {

        }
    }
}