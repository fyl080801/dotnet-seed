using Microsoft.AspNetCore.Http;
using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules.Extensions
{
    public static class RunningEngineTableExtensions
    {
        public static EngineSettings Match(this IRunningEngineTable table, HttpContext httpContext)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }

            var httpRequest = httpContext.Request;

            return table.Match(httpRequest.Host.ToString(), httpRequest.Path, true);
        }
    }
}
