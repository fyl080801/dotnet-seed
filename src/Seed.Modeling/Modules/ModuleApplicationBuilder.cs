using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules
{
    public class ModuleApplicationBuilder
    {
        private IApplicationBuilder _app;

        public ModuleApplicationBuilder(IApplicationBuilder app)
        {
            _app = app;
        }

        public ModuleApplicationBuilder Configure(Action<IApplicationBuilder> configuration)
        {
            configuration(_app);
            return this;
        }
    }
}
