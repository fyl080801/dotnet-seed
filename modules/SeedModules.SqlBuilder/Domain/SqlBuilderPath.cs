using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeedModules.Security.Domain;

namespace SeedModules.SqlBuilder.Domain
{
    [Table("SqlBuilderPath")]
    public class SqlBuilderPath
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public virtual SqlBuilderPath Parent { get; set; }

        public int? OwnerId { get; set; }

        [ForeignKey("OwnerId")]
        public virtual User Owner { get; set; }
    }

    public class SqlBuilderPathTypeConfiguration : IEntityTypeConfiguration<SqlBuilderPath>
    {
        public void Configure(EntityTypeBuilder<SqlBuilderPath> builder)
        {

        }
    }
}