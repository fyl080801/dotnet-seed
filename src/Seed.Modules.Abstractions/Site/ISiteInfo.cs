using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Modules.Site
{
    public interface ISiteInfo : IJEntity
    {
        string SiteName { get; set; }

        string BaseUrl { get; set; }

        string SuperUser { get; set; }

        //string SiteSalt { get; set; }

        //string Culture { get; set; }

        //string Calendar { get; set; }

        //string TimeZone { get; set; }

        //ResourceDebugMode ResourceDebugMode { get; set; }

        //bool UseCdn { get; set; }

        int PageSize { get; set; }

        string PageCounts { get; set; }

        // int MaxPageSize { get; set; }

        // int MaxPagedCount { get; set; }

        RouteValueDictionary HomeRoute { get; set; }
    }
}
