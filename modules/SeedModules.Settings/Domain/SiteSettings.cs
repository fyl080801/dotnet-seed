using Microsoft.AspNetCore.Routing;
using Seed.Data;
using Seed.Modules.Site;
using System.ComponentModel.DataAnnotations;

namespace SeedModules.Settings.Domain
{
    public class SiteSettings : JEntity, ISiteInfo
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string SiteName { get; set; }

        [StringLength(500)]
        public string BaseUrl { get; set; }

        [StringLength(50)]
        public string SuperUser { get; set; }

        public RouteValueDictionary HomeRoute { get; set; }
    }
}
