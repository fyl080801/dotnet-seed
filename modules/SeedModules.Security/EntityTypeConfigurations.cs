using Seed.Data;
using SeedModules.Security.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.Security
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return Task.FromResult(new object[]
            {
                new RoleTypeConfiguration(),
                new RoleClaimTypeConfiguration(),
                new UserRoleTypeConfiguration(),
                new UserRoleTypeConfiguration()
            }.AsEnumerable());
        }
    }
}