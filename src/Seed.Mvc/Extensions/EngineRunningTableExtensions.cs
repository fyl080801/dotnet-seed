using Microsoft.AspNetCore.Http;
using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Mvc.Extensions
{
    public static class EngineRunningTableExtensions
    {
        public static EngineVariables Match(this IEngineRunningTable engineRunningTable, HttpContext httpContext)
        {
            try
            {
                var httpRequest = httpContext.Request;
                if (httpRequest == null)
                {
                    return null;
                }

                var host = httpRequest.Headers["Host"].ToString();

                return engineRunningTable.Match(host ?? string.Empty, httpRequest.Path);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
