using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeedModules.Arkham.Domain;

namespace SeedModules.Arkham.TypeConfigurations
{
    public class MedicalRecordTypeConfiguration : IEntityTypeConfiguration<MedicalRecord>
    {
        public void Configure(EntityTypeBuilder<MedicalRecord> builder)
        {

        }
    }
}
