using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;

namespace Microsoft.Extensions.DependencyInjection
{
    internal class StartupActions
    {
        public StartupActions(int order)
        {
            Order = order;
        }

        public int Order { get; }

        public ICollection<Action<IServiceCollection, IServiceProvider>> ConfigureServicesActions { get; } = new List<Action<IServiceCollection, IServiceProvider>>();

        public ICollection<Action<IApplicationBuilder, IRouteBuilder, IServiceProvider>> ConfigureActions { get; } = new List<Action<IApplicationBuilder, IRouteBuilder, IServiceProvider>>();
    }
}
