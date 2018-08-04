using Seed.Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Project.Steps
{
    public class ProjectStep : IProjectStepHandler
    {
        private readonly IEnumerable<IProjectHarvester> _projectHarvesters;
        private readonly IProjectExecutor _executor;

        public ProjectStep(
            IEnumerable<IProjectHarvester> projectHarvesters,
            IProjectExecutor executor)
        {
            _projectHarvesters = projectHarvesters;
            _executor = executor;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        /// <example>
        /// {
        ///     "name": "projects",
        ///     "projects": [
        ///         { "executionid": "", name="Core" }
        ///     ]
        /// }
        /// </example>
        public async Task ExecuteAsync(ProjectExecutionContext context)
        {
            if (!String.Equals(context.Name, "Projects", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var step = context.Step.ToObject<InternalStep>();
            var projectDictionary = new Dictionary<string, IDictionary<string, ProjectDescriptor>>();

            foreach (var pro in step.Values)
            {
                if (!projectDictionary.TryGetValue(pro.ExecutionId, out IDictionary<string, ProjectDescriptor> project))
                {
                    var projectCollections = await Task.WhenAll(_projectHarvesters.Select(x => x.HarvestProjectsAsync()));
                    project = projectCollections.SelectMany(x => x).ToDictionary(x => x.Name);
                    projectDictionary[pro.ExecutionId] = project;
                }

                if (!project.ContainsKey(pro.Name))
                {
                    throw new ArgumentException($"未在 '{pro.ExecutionId}' 中找到名称为 '{pro.Name}' 的项目.");
                }

                var executionId = Guid.NewGuid().ToString();
                await _executor.ExecuteAsync(executionId, project[pro.Name], context.Environment);
            }
        }

        private class InternalStep
        {
            public InternalStepValue[] Values { get; set; }
        }

        private class InternalStepValue
        {
            public string ExecutionId { get; set; }
            public string Name { get; set; }
        }
    }
}
