using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.MindPlus.Domain
{
    /// <summary>
    /// 项目基线
    /// </summary>
    [Table("BaseLine")]
    public class BaseLine
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50), Required]
        public string Name { get; set; }

        [StringLength(10)]
        public string Color { get; set; }

        public int MindWorkId { get; set; }

        [ForeignKey("MindWorkId")]
        public virtual MindWork MindWork { get; set; }
    }

    public class BaseLineTypeConfiguration : IEntityTypeConfiguration<BaseLine>
    {
        public void Configure(EntityTypeBuilder<BaseLine> builder)
        {

        }
    }
}