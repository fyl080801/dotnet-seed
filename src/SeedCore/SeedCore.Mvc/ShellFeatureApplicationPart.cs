using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyModel;
using SeedCore.Shell.Builders.Models;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace SeedCore.Mvc
{
    public class ShellFeatureApplicationPart :
         ApplicationPart,
         IApplicationPartTypeProvider,
         ICompilationReferencesProvider
    {
        private static IEnumerable<string> _referencePaths;
        private static object _synLock = new object();

        private readonly IHttpContextAccessor _httpContextAccessor;

        private ShellBlueprint _shellBlueprint;
        private object _fake;
        // private IEnumerable<ITagHelpersProvider> _tagHelpers;

        public ShellFeatureApplicationPart(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public override string Name
        {
            get
            {
                return nameof(ShellFeatureApplicationPart);
            }
        }

        /// <inheritdoc />
        public IEnumerable<TypeInfo> Types
        {
            get
            {
                var services = _httpContextAccessor.HttpContext?.RequestServices;

                if (services != null && _fake == null)
                {
                    lock (this)
                    {
                        if (_fake == null)
                        {
                            _shellBlueprint = services.GetRequiredService<ShellBlueprint>();
                            _fake = new object();
                        }
                    }
                }


                return _shellBlueprint
                    .Dependencies.Keys
                    // .Concat(_tagHelpers.SelectMany(p => p.GetTypes()))
                    .Select(x => x.GetTypeInfo());
            }
        }

        /// <inheritdoc />
        public IEnumerable<string> GetReferencePaths()
        {
            if (_referencePaths != null)
            {
                return _referencePaths;
            }

            lock (_synLock)
            {
                if (_referencePaths != null)
                {
                    return _referencePaths;
                }

                _referencePaths = DependencyContext.Default.CompileLibraries
                    .SelectMany(library => library.ResolveReferencePaths());
            }

            return _referencePaths;
        }
    }
}
