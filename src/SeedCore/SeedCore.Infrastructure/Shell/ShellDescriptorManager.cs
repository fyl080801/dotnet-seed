using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeedCore.Shell.Descriptor;
using SeedCore.Shell.Descriptor.Models;

namespace OrchardCore.Environment.Shell.Data.Descriptors
{
    /// <summary>
    /// Implements <see cref="IShellDescriptorManager"/> by providing the list of features store in the database. 
    /// </summary>
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