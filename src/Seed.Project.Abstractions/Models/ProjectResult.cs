using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Project.Models
{
    public class ProjectResult
    {
        public int Id { get; set; }

        public string ExecutionId { get; set; }

        public List<ProjectStepResult> Steps { get; set; } = new List<ProjectStepResult>();

        public bool IsCompleted => Steps.All(s => s.IsCompleted);

        public bool IsSuccessful => Steps.All(s => s.IsCompleted && s.IsSuccessful);
    }
}
