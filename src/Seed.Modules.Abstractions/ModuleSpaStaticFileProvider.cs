using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.StaticFiles;
using Microsoft.Extensions.FileProviders;
using System.Collections.Generic;

namespace Seed.Modules
{
    public class ModuleSpaStaticFileProvider : ISpaStaticFileProvider
    {
        private readonly IHostingEnvironment _environment;
        private readonly SpaStaticFilesOptions _options;

        public ModuleSpaStaticFileProvider(IServiceProvider serviceProvider, SpaStaticFilesOptions options)
        {
            _environment = serviceProvider.GetService<IHostingEnvironment>();
            _options = options;
        }

        public IFileProvider FileProvider
        {
            get
            {
                if (_environment.IsDevelopment())
                {
                    var fileProviders = new List<IFileProvider>
                    {
                        new ModuleProjectStaticFileProvider(_environment, Module.ClientApp),
                        new ModuleEmbeddedStaticFileProvider(_environment,  Module.ClientApp)
                    };
                    return new CompositeFileProvider(fileProviders);
                }
                else
                {
                    return new ModuleEmbeddedStaticFileProvider(
                        _environment,
                        Module.ClientApp + (string.IsNullOrEmpty(_options.RootPath) ? "" : _options.RootPath + "/")
                    );
                }
            }
        }
    }
}