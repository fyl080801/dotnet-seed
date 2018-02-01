using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Project.Models
{
    public class ProjectDescriptor
    {
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }

        public string Author { get; set; }

        public string WebSite { get; set; }

        public string Version { get; set; }

        public bool IsSetup { get; set; }

        public DateTime? ExportTime { get; set; }

        public string[] Categories { get; set; }

        public string[] Tags { get; set; }
        
        public IFileInfo ProjectFileInfo { get; set; }
    }
}
