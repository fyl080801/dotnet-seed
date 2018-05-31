using Seed.Plugins.Feature;
using Seed.Plugins.Loader;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Plugins
{
    /// <summary>
    /// 插件管理接口
    /// </summary>
    public interface IPluginManager
    {
        IPluginInfo GetPlugin(string id);

        IEnumerable<IPluginInfo> GetPlugins();

        IEnumerable<IFeatureInfo> GetFeatures();

        IEnumerable<IFeatureInfo> GetFeatures(string[] featureIds);

        /// <summary>
        /// 获取功能的依赖项
        /// </summary>
        /// <param name="featureId"></param>
        /// <returns></returns>
        IEnumerable<IFeatureInfo> GetDependencyFeatures(string featureId);

        /// <summary>
        /// 获取被功能依赖的项
        /// </summary>
        /// <param name="featureId"></param>
        /// <returns></returns>
        IEnumerable<IFeatureInfo> GetFeatureDependencies(string featureId);

        Task<PluginEntry> GetPluginEntryAsync(IPluginInfo plugin);

        Task<IEnumerable<FeatureEntry>> GetFeaturesAsync();

        Task<IEnumerable<FeatureEntry>> GetFeaturesAsync(string[] featureIds);
    }
}