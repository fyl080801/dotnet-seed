using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.MindPlus.Domain
{
    [Table("MindWork")]
    public class MindWork
    {
        [Key, Required]
        public int Id { get; set; }

        [StringLength(50), Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsFolder { get; set; }

        public DateTime ModifyTime { get; set; } = DateTime.Now;

        public int? ParentId { get; set; }

        [StringLength(500)]
        public string Path { get; set; }

        [ForeignKey("ParentId")]
        public virtual MindWork Parent { get; set; }
    }

    public class MindWorkTypeConfiguration : IEntityTypeConfiguration<MindWork>
    {
        public void Configure(EntityTypeBuilder<MindWork> builder)
        {

        }
    }
}