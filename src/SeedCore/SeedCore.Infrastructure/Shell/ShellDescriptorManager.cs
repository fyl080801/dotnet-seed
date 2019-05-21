using SeedCore.Shell.Descriptor;
using SeedCore.Shell.Descriptor.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeedCore.Infrastructure.Shell
{
    public class ShellDescriptorManager : IShellDescriptorManager
    {
        public Task<ShellDescriptor> GetShellDescriptorAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateShellDescriptorAsync(int priorSerialNumber, IEnumerable<ShellFeature> enabledFeatures, IEnumerable<ShellParameter> parameters)
        {
            throw new NotImplementedException();
        }
    }
}