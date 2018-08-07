using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.PageBuilder.Domain
{
    [Table("BuilderDefine")]
    public class BuilderDefine
    {
        [Key]
        public int Id { get; set; }

        public BuilderDefineTypes Type { get; set; }

        [MaxLength(100), Required]
        public string Name { get; set; }

        public string Remark { get; set; }

        public string Define { get; set; }

        public DateTime LastModify { get; set; } = DateTime.Now;
    }

    public class BuilderDefineTypeConfiguration : IEntityTypeConfiguration<BuilderDefine>
    {
        public void Configure(EntityTypeBuilder<BuilderDefine> builder)
        {

        }
    }
}