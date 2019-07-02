using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices;
using System;

namespace SeedModules.Setup
{
    internal class DefaultSpaBuilder : ISpaBuilder
    {
        public IApplicationBuilder ApplicationBuilder { get; }

        public SpaOptions Options { get; }

        public DefaultSpaBuilder(IApplicationBuilder applicationBuilder, SpaOptions options)
        {
            ApplicationBuilder = applicationBuilder
                ?? throw new ArgumentNullException(nameof(applicationBuilder));

            Options = options
                ?? throw new ArgumentNullException(nameof(options));
        }
    }
}
