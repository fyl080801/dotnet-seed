using Microsoft.AspNetCore.Routing;
using SeedCore.Infrastructure.Entities;

namespace SeedCore.Infrastructure.Settings
{
    public interface ISite : IJEntity
    {
        string SiteName { get; set; }
        string SiteSalt { get; set; }
        string SuperUser { get; set; }
        string Culture { get; set; }
        string[] SupportedCultures { get; set; }
        string Calendar { get; set; }
        string TimeZoneId { get; set; }
        ResourceDebugMode ResourceDebugMode { get; set; }
        bool UseCdn { get; set; }
        int PageSize { get; set; }
        int MaxPageSize { get; set; }
        int MaxPagedCount { get; set; }
        string BaseUrl { get; set; }
        RouteValueDictionary HomeRoute { get; set; }
    }
}
