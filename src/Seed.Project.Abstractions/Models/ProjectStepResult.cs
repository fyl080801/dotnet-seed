using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Project.Abstractions.Models
{
    public class ProjectStepResult
    {
        public string StepName { get; set; }

        public bool IsCompleted { get; set; }

        public bool IsSuccessful { get; set; }

        public string ErrorMessage { get; set; }
    }
}
