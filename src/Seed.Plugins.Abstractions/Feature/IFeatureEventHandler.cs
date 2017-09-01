using Seed.Events.Abstractions;
using Seed.Plugins.Abstractions.Feature;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions.Feature
{
    public interface IFeatureEventHandler : IEventHandler
    {
        void Installing(IFeatureInfo feature);
        void Installed(IFeatureInfo feature);
        void Enabling(IFeatureInfo feature);
        void Enabled(IFeatureInfo feature);
        void Disabling(IFeatureInfo feature);
        void Disabled(IFeatureInfo feature);
        void Uninstalling(IFeatureInfo feature);
        void Uninstalled(IFeatureInfo feature);
    }
}
