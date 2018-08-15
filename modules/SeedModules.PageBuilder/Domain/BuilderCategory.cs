using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.PageBuilder.Domain
{
    [Table("BuilderCategory")]
    public class BuilderCategory
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        public BuilderDefineTypes DefineType { get; set; }

        public int ParentId { get; set; }

        [ForeignKey("ParentId")]
        public virtual BuilderCategory Parent { get; set; }

        public int? TemplateId { get; set; }

        [ForeignKey("TemplateId")]
        public virtual BuilderTemplate Template { get; set; }
    }

    public class BuilderCategoryTypeConfiguration : IEntityTypeConfiguration<BuilderCategory>
    {
        public void Configure(EntityTypeBuilder<BuilderCategory> builder)
        {

        }
    }
}