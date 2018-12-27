using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Seed.Data;
using SeedModules.Arkham.Domain;
using SeedModules.Arkham.TypeConfigurations;

namespace SeedModules.Arkham
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public async Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return await Task.FromResult(new object[]
            {
                new PatientTypeConfiguration(),
                new PatientContactTypeConfiguration(),
                new MedicalRecordTypeConfiguration()
            });
        }
    }
}