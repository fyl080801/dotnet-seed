using Microsoft.Extensions.DependencyInjection;
using System;

namespace Seed.Modules
{
    public class ModuleServiceCollection
    {
        IServiceCollection _services;

        public ModuleServiceCollection(IServiceCollection services)
        {
            _services = services;
        }

        public ModuleServiceCollection Configure(Action<IServiceCollection> services)
        {
            services(_services);
            return this;
        }
    }
}
