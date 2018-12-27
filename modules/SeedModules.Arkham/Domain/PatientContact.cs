using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Arkham.Domain
{
    [Table("PatientContact")]
    public class PatientContact
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// 联系方式名称
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string ContactName { get; set; }

        /// <summary>
        /// 号码
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string ContactNumber { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        /// <value></value>
        public int OrderIndex { get; set; }

        /// <summary>
        /// 患者Id
        /// </summary>
        /// <value></value>
        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
    }
}