using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.MindPlus.Domain
{
    [Table("WorkItemContent")]
    public class WorkItemContent
    {
        [Key]
        public int Id { get; set; }

        public string Content { get; set; }

        public virtual WorkItem WorkItem { get; set; }

        public DateTime LastModify { get; set; } = DateTime.Now;
    }

    public class WorkItemContentTypeConfiguration : IEntityTypeConfiguration<WorkItemContent>
    {
        public void Configure(EntityTypeBuilder<WorkItemContent> builder)
        {
            builder.HasOne(e => e.WorkItem).WithOne().HasForeignKey<WorkItemContent>(e => e.Id);
        }
    }
}