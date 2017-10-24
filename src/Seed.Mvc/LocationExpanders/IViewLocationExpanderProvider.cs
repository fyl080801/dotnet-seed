using Microsoft.AspNetCore.Mvc.Razor;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Mvc.LocationExpanders
{
    public interface IViewLocationExpanderProvider : IViewLocationExpander
    {
        int Priority { get; }
    }
}
