using Seed.Data;
using Seed.Project.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Project
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
