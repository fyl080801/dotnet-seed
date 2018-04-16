using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.MindPlus.Domain
{
    [Table("WorkItemStatus")]
    public class WorkItemStatus
    {
        [Key]
        public int Id { get; set; }

        [StringLength(20), Required]
        public string Name { get; set; }

        public int MindWorkId { get; set; }

        [ForeignKey("MindWorkId")]
        public virtual MindWork MindWork { get; set; }
    }

    public class WorkItemStatusTypeConfiguration : IEntityTypeConfiguration<WorkItemStatus>
    {
        public void Configure(EntityTypeBuilder<WorkItemStatus> builder)
        {

        }
    }
}