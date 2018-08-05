using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using Seed.Environment.Plugins;
using Seed.Environment.Plugins.Features;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using SeedModules.Features.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpGet, HandleResult]
        public async Task<object> List([FromQuery]string keyword)
        {
            // 这里需要加特殊权限，只允许Default的管理员可访问
            var enabledFeatures = await _engineFeaturesManager.GetEnabledFeaturesAsync();
            var moduleFeatures = new List<FeatureModel>();
            foreach (var moduleFeatureInfo in _pluginManager.GetFeatures().ToList())
            {
                moduleFeatures.Add(new FeatureModel()
                {
                    Descriptor = moduleFeatureInfo,
                    Enabled = enabledFeatures.Contains(moduleFeatureInfo),
                    Dependencies = _pluginManager.GetDependentFeatures(moduleFeatureInfo.Id).Where(d => d.Id != moduleFeatureInfo.Id).ToList()
                });
            }
            var query = moduleFeatures.AsQueryable();
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(e => e.Descriptor.Name.Contains(keyword) || e.Descriptor.Id.Contains(keyword));
            }
            return new
            {
                List = query.GroupBy(e => !string.IsNullOrEmpty(e.Descriptor.Category) ? e.Descriptor.Category : "其他")
                    .Select(e => new FeatureGroupModel()
                    {
                        Category = e.Key,
                        Features = e
                    }).ToList(),
                Total = moduleFeatures.Count
            };
        }

        [HttpPatch("{id}"), HandleResult(true)]
        public async Task SetEnable([FromBody]FeatureModel model, string id)
        {
            var feature = _pluginManager.GetFeatures().FirstOrDefault(e => e.Id == id);

            if (!IsFeatureAllowed(feature))
            {
                throw this.Exception("该功能不可进行此操作");
            }

            if (feature == null)
            {
                throw this.Exception("未找到该功能");
            }

            if (model.Enabled)
            {
                await _engineFeaturesManager.EnableFeaturesAsync(new[] { feature }, true);
            }
            else
            {
                await _engineFeaturesManager.DisableFeaturesAsync(new[] { feature }, true);
            }
        }

        private bool IsFeatureAllowed(IFeatureInfo feature)
        {
            return feature.DefaultTenantOnly;
        }
    }
}