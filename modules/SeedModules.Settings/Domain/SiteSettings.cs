using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Modules.Site;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeedModules.Settings.Domain
{
    [Table("SiteSettings")]
    public class SiteSettings : ISiteInfo
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string SiteName { get; set; }

        public string BaseUrl { get; set; }

        public string SuperUser { get; set; }
    }

    // public class SiteSettingsConfiguration : IEntityTypeConfiguration<SiteSettings>
    // {
    //     public void Configure(EntityTypeBuilder<SiteSettings> builder)
    //     {

    //     }
    // }
}
