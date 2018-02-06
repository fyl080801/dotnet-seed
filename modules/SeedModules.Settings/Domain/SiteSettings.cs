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

        public string SiteName { get; set; }

        public string BaseUrl { get; set; }

        public string SuperUser { get; set; }

        public RouteValueDictionary HomeRoute { get; set; }
    }

    // public class SiteSettingsConfiguration : IEntityTypeConfiguration<SiteSettings>
    // {
    //     public void Configure(EntityTypeBuilder<SiteSettings> builder)
    //     {

    //     }
    // }
}
