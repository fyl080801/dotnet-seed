using System;

namespace Seed.Environment.Engine.Descriptors
{
    public class EngineFeature : IEquatable<EngineFeature>
    {
        public EngineFeature()
        {
        }

        public EngineFeature(string id, bool alwaysEnabled = false)
        {
            Id = id;
            AlwaysEnabled = alwaysEnabled;
        }

        public string Id { get; set; }
        public bool AlwaysEnabled { get; set; }

        public bool Equals(EngineFeature other)
        {
            if (other == null)
            {
                return false;
            }

            return Id == other.Id;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}
