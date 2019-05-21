using System.Collections.Generic;

namespace SeedCore.Shell.Descriptor.Models
{
    public class ShellDescriptor
    {
        public int Id { get; set; }

        public int SerialNumber { get; set; }

        public IList<ShellFeature> Features { get; set; } = new List<ShellFeature>();

        public IList<ShellParameter> Parameters { get; set; } = new List<ShellParameter>();
    }
}