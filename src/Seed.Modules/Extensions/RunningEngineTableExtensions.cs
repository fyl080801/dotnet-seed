using Microsoft.AspNetCore.Http;
using Seed.Environment.Abstractions.Engine;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules.Extensions
{
    public static class RunningEngineTableExtensions
    {
        public static EngineSettings Match(this IRunningEngineTable table, HttpContext httpContext)
        {
            try
            {
                var httpRequest = httpContext.Request;
                if (httpRequest == null)
                {
                    return null;
                }

                var host = httpRequest.Headers["Host"].ToString();

                return table.Match(host ?? string.Empty, httpRequest.Path);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
