using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Modules.Setup.Events
{
    /// <summary>
    /// 安装操作执行时触发操作
    /// </summary>
    public interface ISetupEventHandler
    {
        /// <summary>
        /// 安装
        /// </summary>
        /// <param name="siteName"></param>
        /// <param name="userName"></param>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="dbProvider"></param>
        /// <param name="dbConnectionString"></param>
        /// <param name="dbTablePrefix"></param>
        /// <param name="errors"></param>
        /// <returns></returns>
        Task Setup(
            string siteName,
            string userName,
            string email,
            string password,
            string dbProvider,
            string dbConnectionString,
            string dbTablePrefix,
            Action<string, string> errors);
    }
}
