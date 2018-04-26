using System.Collections.Generic;
using Seed.Data;

namespace SeedModules.AngularUI.Models
{
    public class ViewOptionsModel : JEntity
    {
        public string Options { get; set; }

        public string SiteSettings { get; set; }

        public IList<string> Scripts { get; set; } = new List<string>();
    }
}