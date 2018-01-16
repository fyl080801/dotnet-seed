using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Data
{
    /// <summary>
    /// 数据访问层持久化接口
    /// </summary>
    public interface IStore
    {
        /// <summary>
        /// 创建一个数据访问上下文
        /// </summary>
        /// <returns></returns>
        IDbContext CreateDbContext();

        /// <summary>
        /// 初始化数据访问
        /// </summary>
        /// <param name="service"></param>
        /// <returns></returns>
        Task InitializeAsync(IServiceProvider service);
    }
}
