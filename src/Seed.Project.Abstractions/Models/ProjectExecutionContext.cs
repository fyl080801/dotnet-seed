using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Project.Models
{
    public class ProjectExecutionContext
    {
        public string ExecutionId { get; set; }

        public object Environment { get; set; }

        public string Name { get; set; }

        public JObject Step { get; set; }
    }
}
