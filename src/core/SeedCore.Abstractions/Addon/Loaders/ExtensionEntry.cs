﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace SeedCore.Addon.Loaders
{
    public class ExtensionEntry
    {
        public IExtensionInfo ExtensionInfo { get; set; }
        public Assembly Assembly { get; set; }
        public IEnumerable<Type> ExportedTypes { get; set; }
        public bool IsError { get; set; }
    }
}