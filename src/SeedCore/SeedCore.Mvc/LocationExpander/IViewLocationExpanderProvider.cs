using Microsoft.AspNetCore.Mvc.Razor;

namespace SeedCore.Mvc.LocationExpander
{
    public interface IViewLocationExpanderProvider : IViewLocationExpander
    {
        int Priority { get; }
    }
}
