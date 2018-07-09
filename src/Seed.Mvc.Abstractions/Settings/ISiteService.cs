using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Mvc.Settings
{
    public interface ISiteService
    {
        Task<ISiteInfo> GetSiteInfoAsync();

        Task UpdateSiteInfoAsync(ISiteInfo site);

        IChangeToken ChangeToken { get; }
    }
}
