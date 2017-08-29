using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Abstractions.Engine
{
    public interface IEngineSettingsManager
    {
        /// <summary>
        /// 获取所有 Engine 设置
        /// </summary>
        /// <returns></returns>
        IEnumerable<EngineSettings> LoadSettings();

        /// <summary>
        /// 保存一个Engine 设置
        /// </summary>
        /// <param name="settings">设置</param>
        void SaveSettings(EngineSettings settings);
    }
}
