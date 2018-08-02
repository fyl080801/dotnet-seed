using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_Location")]
    public class Location : JEntity
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50), Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [JsonIgnore]
        public string Extends { get; private set; }

        [NotMapped]
        public override JObject Properties
        {
            get { return string.IsNullOrEmpty(this.Extends) ? JObject.FromObject(new { }) : JObject.Parse(this.Extends); }
            set { this.Extends = value.ToString(); }
        }

        //public ICollection<Area> Areas { get; set; } = new List<Area>();
    }

    public class LocationTypeConfiguration : IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        {

        }
    }
}
