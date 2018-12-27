using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeedModules.Arkham.Domain;

namespace SeedModules.Arkham.TypeConfigurations
{
    public class PatientContactTypeConfiguration : IEntityTypeConfiguration<PatientContact>
    {
        public void Configure(EntityTypeBuilder<PatientContact> builder)
        {

        }
    }
}
