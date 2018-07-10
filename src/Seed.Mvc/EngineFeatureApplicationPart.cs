using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyModel;
using Seed.Environment.Engine.Builders.Models;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Seed.Mvc
{
    public class EngineFeatureApplicationPart : ApplicationPart, IApplicationPartTypeProvider, ICompilationReferencesProvider
    {
        private static object _locker = new object();
        private static IEnumerable<string> _referencePaths;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public override string Name => nameof(EngineFeatureApplicationPart);

        public EngineFeatureApplicationPart(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public IEnumerable<TypeInfo> Types
        {
            get
            {
                var engineSchema = _httpContextAccessor.HttpContext.RequestServices?.GetRequiredService<EngineSchema>();
                return engineSchema?.Dependencies.Keys.Select(type => type.GetTypeInfo()) ?? Enumerable.Empty<TypeInfo>();
            }
        }

        public IEnumerable<string> GetReferencePaths()
        {
            if (_referencePaths != null)
            {
                return _referencePaths;
            }

            lock (_locker)
            {
                if (_referencePaths != null)
                {
                    return _referencePaths;
                }

                _referencePaths = DependencyContext.Default.CompileLibraries
                    .SelectMany(lib => lib.ResolveReferencePaths());
            }

            return _referencePaths;
        }
    }
}
