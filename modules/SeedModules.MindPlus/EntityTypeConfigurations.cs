using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Seed.Data;
using SeedModules.MindPlus.Domain;
using SeedModules.Security.Domain;

namespace SeedModules.MindPlus
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return Task.FromResult(new object[]
            {
                new MindWorkTypeConfiguration(),
                new TagTypeConfiguration(),
                new WorkItemTypeConfiguration(),
                new WorkItemTagTypeConfiguration()
            }.AsEnumerable());
        }
    }
}