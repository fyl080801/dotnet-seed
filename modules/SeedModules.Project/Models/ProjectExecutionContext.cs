using Newtonsoft.Json.Linq;

namespace SeedModules.Project.Models
{
    public class ProjectExecutionContext
    {
        public string ExecutionId { get; set; }

        public object Environment { get; set; }

        public string Name { get; set; }

        public JObject Step { get; set; }
    }
}
