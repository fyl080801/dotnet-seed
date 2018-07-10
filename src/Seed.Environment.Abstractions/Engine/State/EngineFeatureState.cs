using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Seed.Environment.Engine.State
{
    public class EngineFeatureState
    {
        public string Id { get; set; }

        public States InstallState { get; set; }

        public States EnableState { get; set; }

        [JsonIgnore]
        public bool IsInstalled { get { return InstallState == States.Up; } }

        [JsonIgnore]
        public bool IsEnabled { get { return EnableState == States.Up; } }

        [JsonIgnore]
        public bool IsDisabled { get { return EnableState == States.Down || EnableState == States.Undefined; } }

        [JsonConverter(typeof(StringEnumConverter))]
        public enum States
        {
            Undefined,
            Rising,
            Up,
            Falling,
            Down,
        }
    }
}
