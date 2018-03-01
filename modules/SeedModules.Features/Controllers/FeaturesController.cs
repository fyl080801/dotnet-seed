using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using Seed.Mvc.Extensions;
using Seed.Mvc.Models;
using Seed.Plugins;
using SeedModules.Features.Models;

namespace SeedModules.Features.Controllers
{
    [Route("api/features")]
    public class FeaturesController : Controller
    {
        readonly IEngineFeaturesManager _engineFeaturesManager;
        readonly IPluginManager _pluginManager;

        public FeaturesController(
            IEngineFeaturesManager engineFeaturesManager,
            IPluginManager pluginManager)
        {
            _engineFeaturesManager = engineFeaturesManager;
            _pluginManager = pluginManager;
        }

        [HttpPost("query")]
        public async Task<ApiResult> List()
        {
            // 这里需要加特殊权限，只允许Default的管理员可访问
            var enabledFeatures = await _engineFeaturesManager.GetEnabledFeaturesAsync();
            var moduleFeatures = new List<FeatureModel>();
            foreach (var moduleFeatureInfo in _pluginManager.GetFeatures())
            {
                moduleFeatures.Add(new FeatureModel()
                {
                    Descriptor = moduleFeatureInfo,
                    Enabled = enabledFeatures.Contains(moduleFeatureInfo),
                    Dependencies = _pluginManager.GetFeaturesDependencies(moduleFeatureInfo.Id).Where(d => d.Id != moduleFeatureInfo.Id).ToList()
                });
            }
            return this.Success(new
            {
                List = moduleFeatures.GroupBy(e => !string.IsNullOrEmpty(e.Descriptor.Category) ? e.Descriptor.Category : "其他")
                    .Select(e => new FeatureGroupModel()
                    {
                        Category = e.Key,
                        Features = e
                    }).ToList(),
                Total = moduleFeatures.Count
            });
        }
    }
}