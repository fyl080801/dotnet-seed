using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeedModules.Arkham.Domain;

namespace SeedModules.Arkham.TypeConfigurations
{
    public class PatientTypeConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {

        }
    }
}
