using Seed.Data;
using SeedModules.OpenId.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.OpenId
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return Task.FromResult(new object[]
            {
                new OpenIdApplicationTypeConfiguration(),
                new OpenIdAuthorizationTypeConfiguration(),
                new OpenIdScopeTypeConfiguration(),
                new OpenIdTokenTypeConfiguration()
            }.AsEnumerable());
        }
    }
}
