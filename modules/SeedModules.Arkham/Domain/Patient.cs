using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Arkham.Domain
{
    [Table("Patient")]
    public class Patient
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// 姓
        /// </summary>
        /// <value>The first name.</value>
        [StringLength(50)]
        public string FirstName { get; set; }

        /// <summary>
        /// 名
        /// </summary>
        /// <value>The last name.</value>
        [Required, StringLength(50)]
        public string LastName { get; set; }

        /// <summary>
        /// 生日
        /// </summary>
        /// <value>The birthday.</value>
        public DateTime? Birthday { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        /// <value><c>true</c> if sex; otherwise, <c>false</c>.</value>
        public bool? Sex { get; set; }

        /// <summary>
        /// 籍贯
        /// </summary>
        /// <value>The native place.</value>
        [StringLength(50)]
        public string NativePlace { get; set; }

        /// <summary>
        /// 国家
        /// </summary>
        /// <value></value>
        [StringLength(20)]
        public string Nation { get; set; }

        /// <summary>
        /// 国籍
        /// </summary>
        /// <value></value>
        [StringLength(20)]
        public string Nationality { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <value></value>
        [StringLength(100)]
        public string HomePlace { get; set; }

        /// <summary>
        /// 血型
        /// </summary>
        /// <value></value>
        public int? BloodGroup { get; set; }

        /// <summary>
        /// RH
        /// </summary>
        /// <value></value>
        public int? RH { get; set; }

        /// <summary>
        /// 证件类型
        /// </summary>
        /// <value></value>
        public int? IdType { get; set; }

        /// <summary>
        /// 证件号
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string IdNumber { get; set; }

        /// <summary>
        /// 职业
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string Occupation { get; set; }

        /// <summary>
        /// 婚姻状况
        /// </summary>
        /// <value></value>
        public int? MarriageStatus { get; set; }

        /// <summary>
        /// 居住地
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string LeavePlace { get; set; }

        /// <summary>
        /// 居住地邮编
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string LeaveZipCode { get; set; }

        /// <summary>
        /// 户口所在地
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string RegisteredPlace { get; set; }

        /// <summary>
        /// 户口所在地邮编
        /// </summary>
        /// <value></value>
        [StringLength(50)]
        public string RegisteredZipCode { get; set; }

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
    }
}
