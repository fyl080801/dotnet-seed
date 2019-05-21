using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using SeedCore.Modules;
using SeedCore.Shell;
using SeedCore.Shell.Models;

namespace SeedCore.Mvc.RazorPages
{
    public class ModularPageRazorPagesOptionsSetup : IConfigureOptions<RazorPagesOptions>
    {
        private readonly IApplicationContext _applicationContext;
        private readonly ShellSettings _shellSettings;

        public ModularPageRazorPagesOptionsSetup(IApplicationContext applicationContext, ShellSettings shellSettings)
        {
            _applicationContext = applicationContext;
            _shellSettings = shellSettings;
        }

        public void Configure(RazorPagesOptions options)
        {
            options.Conventions.AddFolderRouteModelConvention("/", model => model.Selectors.Clear());

            if (_shellSettings.State != TenantState.Running)
            {
                options.Conventions.AddAreaFolderRouteModelConvention(_applicationContext.Application.Name, "/",
                    model => model.Selectors.Clear());
            }
            else
            {
                options.Conventions.AddAreaFolderRoute(_applicationContext.Application.Name, "/", "");
            }
        }
    }
}