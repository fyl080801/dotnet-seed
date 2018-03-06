using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json.Linq;
using Seed.Modules.Site;
using SeedModules.Project.Models;
using SeedModules.Project.Services;
using System;
using System.Threading.Tasks;

namespace SeedModules.Settings.Projects
{
    public class SettingsStep : IProjectStepHandler
    {
        readonly ISiteService _siteService;

        public SettingsStep(ISiteService siteService)
        {
            _siteService = siteService;
        }

        public async Task ExecuteAsync(ProjectExecutionContext context)
        {
            if (!String.Equals(context.Name, "Settings", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var model = context.Step;
            var site = await _siteService.GetSiteInfoAsync();

            foreach (JProperty property in model.Properties())
            {
                switch (property.Name)
                {
                    case "BaseUrl":
                        site.BaseUrl = property.Value.ToString();
                        break;

                    //case "Calendar":
                    //    site.Calendar = property.Value.ToString();
                    //    break;

                    //case "Culture":
                    //    site.Culture = property.Value.ToString();
                    //    break;

                    // case "MaxPagedCount":
                    //     site.MaxPagedCount = property.Value<int>();
                    //     break;

                    // case "MaxPageSize":
                    //     site.MaxPageSize = property.Value<int>();
                    //     break;

                    case "PageCounts":
                        site.PageCounts = property.ToString();
                        break;

                    case "PageSize":
                        site.PageSize = property.Value<int>();
                        break;

                    //case "ResourceDebugMode":
                    //    site.ResourceDebugMode = property.Value<ResourceDebugMode>();
                    //    break;

                    case "SiteName":
                        site.SiteName = property.ToString();
                        break;

                    //case "SiteSalt":
                    //    site.SiteSalt = property.ToString();
                    //    break;

                    case "SuperUser":
                        site.SuperUser = property.ToString();
                        break;

                    //case "TimeZone":
                    //    site.TimeZone = property.ToString();
                    //    break;

                    //case "UseCdn":
                    //    site.UseCdn = property.Value<bool>();
                    //    break;

                    case "HomeRoute":
                        site.HomeRoute = property.Value.ToObject<RouteValueDictionary>();
                        break;

                    default:
                        site.Properties.Add(property);
                        break;
                }
            }

            await _siteService.UpdateSiteInfoAsync(site);
        }
    }
}
