namespace Seed.Plugins.Feature
{
    /// <summary>
    /// 功能的事件处理
    /// </summary>
    public interface IFeatureEventHandler
    {
        /// <summary>
        /// 安装时的处理
        /// </summary>
        /// <param name="feature"></param>
        void Installing(IFeatureInfo feature);

        /// <summary>
        /// 安装后的处理
        /// </summary>
        /// <param name="feature"></param>
        void Installed(IFeatureInfo feature);

        /// <summary>
        /// 启用时的处理
        /// </summary>
        /// <param name="feature"></param>
        void Enabling(IFeatureInfo feature);

        /// <summary>
        /// 启用后的处理
        /// </summary>
        /// <param name="feature"></param>
        void Enabled(IFeatureInfo feature);

        /// <summary>
        /// 禁用时的处理
        /// </summary>
        /// <param name="feature"></param>
        void Disabling(IFeatureInfo feature);

        /// <summary>
        /// 禁用后的处理
        /// </summary>
        /// <param name="feature"></param>
        void Disabled(IFeatureInfo feature);

        /// <summary>
        /// 卸载时的处理
        /// </summary>
        /// <param name="feature"></param>
        void Uninstalling(IFeatureInfo feature);

        /// <summary>
        /// 卸载后的处理
        /// </summary>
        /// <param name="feature"></param>
        void Uninstalled(IFeatureInfo feature);
    }
}
