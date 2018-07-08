﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Plugins.Features
{
    public abstract class FeatureEntry
    {
        public IFeatureInfo FeatureInfo { get; protected set; }
        public IEnumerable<Type> ExportedTypes { get; protected set; }
    }

    public class NonCompiledFeatureEntry : FeatureEntry
    {
        public NonCompiledFeatureEntry(IFeatureInfo featureInfo)
        {
            FeatureInfo = featureInfo;
            ExportedTypes = Enumerable.Empty<Type>();
        }
    }

    public class CompiledFeatureEntry : FeatureEntry
    {
        public CompiledFeatureEntry(IFeatureInfo featureInfo, IEnumerable<Type> exportedTypes)
        {
            FeatureInfo = featureInfo;
            ExportedTypes = exportedTypes;
        }
    }
}
