using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json.Linq;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SeedModules.Acc.Domain
{
    /// <summary>
    /// 设备
    /// </summary>
    [Table("Acc_Equipment")]
    public class Equipment : JEntity
    {
        [Key]
        public int Id { get; set; }

        [StringLength(255), Required]
        public string Code { get; set; }

        [StringLength(255), Required]
        public string Name { get; set; }

        [StringLength(255)]
        public string CabinCode { get; set; }

        [StringLength(255)]
        public string CabinName { get; set; }

        [StringLength(255)]
        public string CategoryCode { get; set; }

        [StringLength(255)]
        public string CategoryName { get; set; }

        public string Extends { get; private set; }

        [NotMapped]
        public override JObject Properties
        {
            get { return string.IsNullOrEmpty(this.Extends) ? JObject.FromObject(new { }) : JObject.Parse(this.Extends); }
            set { this.Extends = value.ToString(); }
        }
    }

    public class EquipmentTypeConfiguration : IEntityTypeConfiguration<Equipment>
    {
        public void Configure(EntityTypeBuilder<Equipment> builder)
        {

        }
    }
}
