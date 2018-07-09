using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Descriptors;
using Seed.Environment.Engine.Extensions;
using Seed.Environment.Plugins;
using Seed.Security.Permissions;

namespace SeedModules.Mvc
{
    public class Permissions : IPermissionProvider
    {
        readonly IPluginManager _pluginManager;
        readonly EngineDescriptor _engineDescriptor;
        readonly ILogger _logger;

        public Permissions(
            IPluginManager pluginManager,
            EngineDescriptor engineDescriptor,
            ILogger<Permissions> logger)
        {
            _logger = logger;
            _engineDescriptor = engineDescriptor;
            _pluginManager = pluginManager;
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype {
                    Name = "Administrator",
                    Permissions = GetPermissions()
                }
            };
        }

        public IEnumerable<PermissionInfo> GetPermissions()
        {
            return Enumerable.Empty<PermissionInfo>();
        }

        private Task<IEnumerable<PermissionInfo>> GetControllerPermissions(Controller controller)
        {
            return Task.FromResult(Enumerable.Empty<PermissionInfo>());
        }
    }
}