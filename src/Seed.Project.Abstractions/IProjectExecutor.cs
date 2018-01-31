using Seed.Project.Abstractions.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Project.Abstractions
{
    public interface IProjectExecutor
    {
        Task<string> ExecuteAsync(string executionId, ProjectDescriptor projectDescriptor, object environment);
    }
}
