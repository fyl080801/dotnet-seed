using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Seed.Environment.Engine.Descriptors
{
    /// <summary>
    /// Engine 描述
    /// </summary>
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
        public int SerialNumber { get; set; }

        /// <summary>
        /// 特性集合
        /// </summary>
        public IList<EngineFeature> Features { get; set; } = new List<EngineFeature>();

        /// <summary>
        /// 参数
        /// </summary>
        public IList<EngineParameter> Parameters { get; set; } = new List<EngineParameter>();
    }
}
