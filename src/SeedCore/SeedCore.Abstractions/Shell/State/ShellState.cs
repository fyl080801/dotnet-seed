using System.Collections.Generic;

namespace SeedCore.Shell.State
{
    public class ShellState
    {
        public List<ShellFeatureState> Features { get; } = new List<ShellFeatureState>();
    }
}
