using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json.Linq;
using Seed.Data.Extensions;
using Seed.Modules.Site;
using SeedModules.AngularUI.Models;
using SeedModules.Project.Models;
using SeedModules.Project.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Projects
{
    public class RouteSettingStep : IProjectStepHandler
    {
        readonly ISiteService _siteService;

        public RouteSettingStep(ISiteService siteService)
        {
            _siteService = siteService;
        }

        public async Task ExecuteAsync(ProjectExecutionContext context)
        {
            if (!String.Equals(context.Name, "routeSettings", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var model = context.Step;
            var site = await _siteService.GetSiteInfoAsync();
            var routeReferences = site.As<IEnumerable<RouteViewReference>>("RouteReferences");
            var stepReference = model.Properties().FirstOrDefault(e => String.Equals(e.Name, "routeReferences", StringComparison.OrdinalIgnoreCase));
            if (stepReference != null)
            {
                var projectReferences = stepReference.Value.ToObject<RouteViewReference[]>();
                var newReferences = routeReferences.Where(e => !projectReferences.Select(x => x.Route).Contains(e.Route)).ToList();
                newReferences.AddRange(projectReferences);
                site.Properties["RouteReferences"] = JArray.FromObject(newReferences);

                await _siteService.UpdateSiteInfoAsync(site);
            }
        }
    }
}
