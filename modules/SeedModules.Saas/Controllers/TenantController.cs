using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using SeedModules.Saas.Models;

namespace SeedModules.Saas.Controllers
{
    [Route("api/tenant")]
    public class TenantController : Controller
    {
        readonly IEngineHost _engineHost;
        readonly IEngineSettingsManager _engineSettingsManager;
        readonly EngineSettings _currentSettings;

        public TenantController(
            IEngineHost engineHost,
            IEngineSettingsManager engineSettingsManager,
            EngineSettings currentSettings)
        {
            _engineHost = engineHost;
            _engineSettingsManager = engineSettingsManager;
            _currentSettings = currentSettings;
        }

        [HttpPost, HandleResult]
        public object List(
            [FromBody]TenantQueryModel search,
            [FromQuery]int page,
            [FromQuery]int count)
        {
            var query = GetEngines()
                .Skip((page - 1) * count)
                .Take(count)
                .Select(e => new EngineSettingsModel()
                {
                    Name = e.Settings.Name,
                    IsDefault = string.Equals(e.Settings.Name, EngineHelper.DefaultEngineName, StringComparison.OrdinalIgnoreCase),
                    EngineSettings = e.Settings
                });
            return new PagedResult<EngineSettingsModel>()
            {
                List = query.ToList(),
                Total = GetEngines().Count()
            };
        }

        [HttpPost("info"), HandleResult]
        public void Create([FromBody]TenantModel model)
        {
            if (!IsDefault())
            {
                throw this.Exception("非默认上下文禁止此操作");
            }

            if (ModelState.IsValid)
            {
                ValidateViewModel(model, true);
            }
            else
            {
                throw this.Exception(ModelState);
            }

            if (!ModelState.IsValid)
            {
                throw this.Exception(ModelState);
            }

            var engineSettings = new EngineSettings()
            {
                Name = model.Name,
                RequestUrlPrefix = model.RequestUrlPrefix?.Trim(),
                RequestUrlHost = model.RequestUrlHost,
                ConnectionString = model.ConnectionString,
                TablePrefix = model.TablePrefix,
                DatabaseProvider = model.DatabaseProvider,
                State = TenantStates.Uninitialized
            };

            _engineSettingsManager.SaveSettings(engineSettings);
            _engineHost.GetOrCreateContext(engineSettings);
        }

        private void ValidateViewModel(TenantModel model, bool newTenant)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                ModelState.AddModelError(nameof(TenantModel.Name), "名称不可为空");
            }

            var allEngines = GetEngines();

            if (newTenant && allEngines.Any(tenant => string.Equals(tenant.Settings.Name, model.Name, StringComparison.OrdinalIgnoreCase)))
            {
                ModelState.AddModelError(nameof(TenantModel.Name), "名称重复");
            }

            if (!string.IsNullOrEmpty(model.Name) && !Regex.IsMatch(model.Name, @"^\w+$"))
            {
                ModelState.AddModelError(nameof(TenantModel.Name), "名称只能是字母切不包含空格");
            }

            if (!IsDefault() && string.IsNullOrWhiteSpace(model.RequestUrlHost) && string.IsNullOrWhiteSpace(model.RequestUrlPrefix))
            {
                ModelState.AddModelError(nameof(TenantModel.RequestUrlPrefix), "Url前缀和主机不可同时为空");
            }

            var allOtherEngine = allEngines.Where(tenant => !string.Equals(tenant.Settings.Name, model.Name, StringComparison.OrdinalIgnoreCase));
            if (allOtherEngine.Any(tenant => string.Equals(tenant.Settings.RequestUrlPrefix, model.RequestUrlPrefix?.Trim(), StringComparison.OrdinalIgnoreCase) && string.Equals(tenant.Settings.RequestUrlHost, model.RequestUrlHost, StringComparison.OrdinalIgnoreCase)))
            {
                ModelState.AddModelError(nameof(TenantModel.RequestUrlPrefix), "主机名和前缀已经存在");
            }

            if (!string.IsNullOrWhiteSpace(model.RequestUrlPrefix))
            {
                if (model.RequestUrlPrefix.Contains('/'))
                {
                    ModelState.AddModelError(nameof(TenantModel.RequestUrlPrefix), "Url前缀不能包含 '/' ");
                }
            }
        }

        private IEnumerable<EngineContext> GetEngines()
        {
            return _engineHost.GetContexts().OrderBy(x => x.Settings.Name);
        }

        private bool IsDefault()
        {
            return string.Equals(_currentSettings.Name, EngineHelper.DefaultEngineName, StringComparison.OrdinalIgnoreCase);
        }
    }
}