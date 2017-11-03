using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Seed.Environment.Engine.Descriptors
{
    /// <summary>
    /// Engine 描述
    /// </summary>
    [Table("EngineDescriptor")]
    public class EngineDescriptor
    {
        /// <summary>
        /// Id
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// 序列号
        /// </summary>
        public string SerialNumber { get; set; }

        /// <summary>
        /// 特性集合
        /// </summary>
        public IList<EngineFeature> Features { get; set; } = new List<EngineFeature>();

        /// <summary>
        /// 参数
        /// </summary>
        public IList<EngineParameter> Parameters { get; set; } = new List<EngineParameter>();
    }

    public class EngineDescriptorEntityConfiguration : IEntityTypeConfiguration<EngineDescriptor>
    {
        public void Configure(EntityTypeBuilder<EngineDescriptor> builder)
        {

        }
    }
}
