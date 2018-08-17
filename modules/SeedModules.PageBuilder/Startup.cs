using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Modules;
using SeedModules.AngularUI.Rendering;
using SeedModules.PageBuilder.Domain;
using System;

namespace SeedModules.PageBuilder
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRouteReferenceProvider, RouteReferences>();
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();

            services.AddOData();
            services.AddScoped<MetadataController>();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            var builder = new ODataConventionModelBuilder();
            builder.EntitySet<BuilderDefine>("BuilderDefine");

            app.UseMvc(rb =>
            {
                rb.Count().Filter().OrderBy().Expand().Select().MaxTop(null);
                rb.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
                rb.EnableDependencyInjection();
            });
        }
    }
}
