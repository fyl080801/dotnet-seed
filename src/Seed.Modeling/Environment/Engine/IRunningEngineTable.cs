using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    /// <summary>
    /// 
    /// </summary>
    public interface IRunningEngineTable
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="settings"></param>
        void Add(EngineSettings settings);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="settings"></param>
        void Remove(EngineSettings settings);

        /// <summary>
        /// 根据 http 访问匹配 EngineSettings
        /// </summary>
        /// <param name="host"></param>
        /// <param name="appRelativeCurrentExecutionFilePath"></param>
        /// <returns></returns>
        EngineSettings Match(string host, string appRelativeCurrentExecutionFilePath);
    }
}
