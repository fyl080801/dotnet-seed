using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.MindPlus.Domain
{
    [Table("Tag")]
    public class Tag
    {
        [Key]
        public int Id { get; set; }

        [StringLength(25), Required]
        public string Name { get; set; }

        [StringLength(7)]
        public string Color { get; set; }

        public virtual List<WorkItemTag> WorkItems { get; set; }
    }

    public class TagTypeConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {

        }
    }
}