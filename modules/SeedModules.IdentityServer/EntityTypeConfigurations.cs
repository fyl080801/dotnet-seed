using Seed.Data;
using SeedModules.IdentityServer.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.IdentityServer
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return Task.FromResult(new object[]
            {
                new IdentityClientTypeConfiguration()
            }.AsEnumerable());
        }
    }
}
