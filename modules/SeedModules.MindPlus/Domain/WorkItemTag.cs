using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.MindPlus.Domain
{
    [Table("WorkItemTag")]
    public class WorkItemTag
    {
        public int TagId { get; set; }

        public virtual Tag Tag { get; set; }

        public int WorkItemId { get; set; }

        public virtual WorkItem WorkItem { get; set; }
    }

    public class WorkItemTagTypeConfiguration : IEntityTypeConfiguration<WorkItemTag>
    {
        public void Configure(EntityTypeBuilder<WorkItemTag> builder)
        {
            builder.HasKey(e => new { e.TagId, e.WorkItemId });
            // builder.HasOne(e => e.Tag).WithMany(e => e.WorkItems).HasForeignKey(e => e.TagId);
            // builder.HasOne(e => e.WorkItem).WithMany(e => e.Tags).HasForeignKey(e => e.WorkItemId);
            builder.HasOne(e => e.Tag).WithMany(e => e.WorkItems).OnDelete(DeleteBehavior.ClientSetNull).HasForeignKey(e => e.TagId);
            builder.HasOne(e => e.WorkItem).WithMany(e => e.Tags).OnDelete(DeleteBehavior.ClientSetNull).HasForeignKey(e => e.WorkItemId);
        }
    }
}