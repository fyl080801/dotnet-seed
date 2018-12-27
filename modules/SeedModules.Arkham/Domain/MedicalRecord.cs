using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Arkham.Domain
{
    [Table("MedicalRecord")]
    public class MedicalRecord
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// 创建人Id
        /// </summary>
        /// <value></value>
        public int CreateUserId { get; set; }

        /// <summary>
        /// 创建人
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string CreateUser { get; set; }

        /// <summary>
        /// 修改人Id
        /// </summary>
        /// <value></value>
        public int ModifyUserId { get; set; }

        /// <summary>
        /// 修改人
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string ModifyUser { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        /// <value></value>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 更新时间
        /// </summary>
        /// <value></value>
        public DateTime ModifyTime { get; set; }

        /// <summary>
        /// 患者Id
        /// </summary>
        /// <value></value>
        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
    }
}