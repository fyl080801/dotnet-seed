using Seed.Data;
using SeedModules.OpenId.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.OpenId
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return Task.FromResult(new object[]
            {
                new OpenIddictApplicationTypeConfiguration(),
                new OpenIddictAuthorizationTypeConfiguration(),
                new OpenIddictScopeTypeConfiguration(),
                new OpenIddictTokenTypeConfiguration()
            }.AsEnumerable());
        }
    }
}
