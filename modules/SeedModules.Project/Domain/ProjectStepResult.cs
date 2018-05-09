using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Project.Domain
{
    [Table("ProjectStepResult")]
    public class ProjectStepResult
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string StepName { get; set; }

        public bool IsCompleted { get; set; }

        public bool IsSuccessful { get; set; }

        public string ErrorMessage { get; set; }

        public int ProjectResultId { get; set; }

        [ForeignKey("ProjectResultId")]
        public virtual ProjectResult ProjectResult { get; set; }
    }

    public class ProjectStepResultTypeConfiguration : IEntityTypeConfiguration<ProjectStepResult>
    {
        public void Configure(EntityTypeBuilder<ProjectStepResult> builder)
        {

        }
    }
}
