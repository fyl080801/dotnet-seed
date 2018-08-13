using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Seed.Data;
using SeedModules.PageBuilder.Domain;

namespace SeedModules.PageBuilder
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public async Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return await Task.FromResult(new object[]
            {
                new BuilderDefineTypeConfiguration(),
                new BuilderTemplateTypeConfiguration(),
                new TemplateDefineTypeConfiguration()
            });
        }
    }
}