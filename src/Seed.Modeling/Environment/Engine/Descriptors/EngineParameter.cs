using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Seed.Environment.Engine.Descriptors
{
    [Table("EngineParameter")]
    public class EngineParameter
    {
        [Key]
        public int Id { get; set; }

        public string Component { get; set; }

        public string Name { get; set; }

        public string Value { get; set; }
    }

    public class EngineParameterEntityConfiguration : IEntityTypeConfiguration<EngineParameter>
    {
        public void Configure(EntityTypeBuilder<EngineParameter> builder)
        {

        }
    }
}
