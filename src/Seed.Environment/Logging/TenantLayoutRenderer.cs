using NLog;
using NLog.LayoutRenderers;
using NLog.Web.LayoutRenderers;
using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Logging
{
    [LayoutRenderer(LayoutRendererName)]
    public class TenantLayoutRenderer : AspNetLayoutRendererBase
    {
        public const string LayoutRendererName = "seed-tenant-name";

        protected override void DoAppend(StringBuilder builder, LogEventInfo logEvent)
        {
            var tenantName = HttpContextAccessor.HttpContext.Features.Get<EngineContext>()?.Settings?.Name ?? "None";
            builder.Append(tenantName);
        }
    }
}
