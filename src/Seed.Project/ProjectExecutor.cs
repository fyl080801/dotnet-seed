using Seed.Project.Abstractions;
using Seed.Project.Abstractions.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Project
{
    public class ProjectExecutor : IProjectExecutor
    {
        public async Task<string> ExecuteAsync(string executionId, ProjectDescriptor projectDescriptor, object environment)
        {
            return await Task.FromResult("");
        }
    }
}
