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
        static readonly object locker = new object();

        private readonly IHostingEnvironment _environment;
        private readonly SpaStaticFilesOptions _options;

        private IFileProvider _provider;

        public ModuleSpaStaticFileProvider(IServiceProvider serviceProvider, SpaStaticFilesOptions options)
        {
            _environment = serviceProvider.GetService<IHostingEnvironment>();
            _options = options;
        }

        public IFileProvider FileProvider
        {
            get
            {
                if (_provider == null)
                {
                    lock (locker)
                    {
                        if (_provider == null)
                        {
                            var fileProviders = new List<IFileProvider>();

                            if (_environment.IsDevelopment())
                            {
                                fileProviders.Add(new ModuleProjectStaticFileProvider(_environment, Module.ClientApp));
                                fileProviders.Add(new ModuleEmbeddedStaticFileProvider(_environment, Module.ClientApp));
                            }
                            else
                            {
                                fileProviders.Add(new ModuleEmbeddedStaticFileProvider(
                                    _environment,
                                    Module.ClientApp + (string.IsNullOrEmpty(_options.RootPath) ? "" : _options.RootPath + "/")));
                            }

                            _provider = new CompositeFileProvider(fileProviders);
                        }
                    }
                }
                return _provider;
            }
        }
    }
}