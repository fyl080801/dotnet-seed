using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Seed.Data;
using SeedModules.Project.Domain;

namespace SeedModules.Project
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return Task.FromResult(new object[]
            {
                new ProjectResultTypeConfiguration(),
                new ProjectStepResultTypeConfiguration()
            }.AsEnumerable());
        }
    }
}