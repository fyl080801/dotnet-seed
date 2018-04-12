using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.MindPlus.Domain
{
    [Table("WorkItem")]
    public class WorkItem
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string Title { get; set; }

        public int? ParentId { get; set; }

        [StringLength(255)]
        public string Path { get; set; }

        public bool Finished { get; set; }

        public int Level { get; set; }

        public DateTime CreateTime { get; set; } = DateTime.Now;

        public DateTime ModifyTime { get; set; } = DateTime.Now;

        public int MindWorkId { get; set; }

        public virtual List<WorkItemTag> Tags { get; set; }

        [ForeignKey("MindWorkId")]
        public virtual MindWork MindWork { get; set; }

        [ForeignKey("ParentId")]
        public virtual WorkItem Parent { get; set; }
    }

    public class WorkItemTypeConfiguration : IEntityTypeConfiguration<WorkItem>
    {
        public void Configure(EntityTypeBuilder<WorkItem> builder)
        {
            
        }
    }
}