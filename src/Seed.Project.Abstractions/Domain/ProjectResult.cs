using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Seed.Project.Domain
{
    [Table("ProjectResult")]
    public class ProjectResult
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string ExecutionId { get; set; }

        [StringLength(50)]
        public string ProjectName { get; set; }

        [StringLength(50)]
        public string DisplayName { get; set; }

        public string Description { get; set; }

        [StringLength(25)]
        public string Version { get; set; }

        [NotMapped]
        public bool IsCompleted => Steps.All(s => s.IsCompleted);

        [NotMapped]
        public bool IsSuccessful => Steps.All(s => s.IsCompleted && s.IsSuccessful);

        public virtual ICollection<ProjectStepResult> Steps { get; set; } = new HashSet<ProjectStepResult>();
    }

    public class ProjectResultTypeConfiguration : IEntityTypeConfiguration<ProjectResult>
    {
        public void Configure(EntityTypeBuilder<ProjectResult> builder)
        {

        }
    }
}
