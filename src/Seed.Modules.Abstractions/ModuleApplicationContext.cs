using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Modules
{
    public static class ModuleApplicationContext
    {
        private static Application _application;
        private static readonly IDictionary<string, Module> _modules = new Dictionary<string, Module>();
        private static readonly object _synLock = new object();

        public static Application GetApplication(this IHostingEnvironment environment)
        {
            if (_application == null)
            {
                lock (_synLock)
                {
                    _application = _application ?? new Application(environment);
                }
            }

            return _application;
        }

        public static Module GetModule(this IHostingEnvironment environment, string name)
        {
            if (!_modules.TryGetValue(name, out var module))
            {
                var namedModule = environment.GetApplication().ModuleNames.FirstOrDefault(e => e.Name.Equals(name, StringComparison.Ordinal));
                if (namedModule == null)
                {
                    return new Module(new NamedModule(string.Empty, null));
                }

                lock (_synLock)
                {
                    if (!_modules.TryGetValue(name, out module))
                    {
                        _modules[name] = module = new Module(namedModule, name == environment.ApplicationName);
                    }
                }
            }

            return module;
        }
    }
}
