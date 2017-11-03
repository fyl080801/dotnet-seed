using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Seed.Environment.Engine
{
    [Table("EngineFeatureState")]
    public class EngineFeatureState
    {
        [Key]
        public string Id { get; set; }

        public State InstallState { get; set; }

        public State EnableState { get; set; }

        [JsonIgnore]
        [NotMapped]
        public bool IsInstalled
        {
            get { return InstallState == State.Up; }
        }

        [JsonIgnore]
        [NotMapped]
        public bool IsEnabled
        {
            get { return EnableState == State.Up; }
        }

        [JsonIgnore]
        [NotMapped]
        public bool IsDisabled
        {
            get { return EnableState == State.Down || EnableState == State.Undefined; }
        }

        [JsonConverter(typeof(StringEnumConverter))]
        public enum State
        {
            Undefined,
            Rising,
            Up,
            Falling,
            Down,
        }
    }

    public class EngineFeatureStateEntityConfiguration : IEntityTypeConfiguration<EngineFeatureState>
    {
        public void Configure(EntityTypeBuilder<EngineFeatureState> builder)
        {

        }
    }
}
