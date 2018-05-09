using Microsoft.Extensions.Configuration;

namespace Seed.Plugins.Descriptors
{
    /// <summary>
    /// 插件描述信息处理接口
    /// </summary>
    public interface IDescriptorProvider
    {
        /// <summary>
        /// 排序
        /// </summary>
        int Order { get; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="builder"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        IConfigurationBuilder GetConfigurationBuilder(IConfigurationBuilder builder, string path);
    }
}