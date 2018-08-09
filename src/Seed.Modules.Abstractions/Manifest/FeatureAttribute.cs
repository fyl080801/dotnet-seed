﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Modules.Manifest
{
    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true, Inherited = false)]
    public class FeatureAttribute : Attribute
    {
        public FeatureAttribute()
        {
        }

        public bool Exists => Id != null;

        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; } = String.Empty;

        public string[] Dependencies { get; set; } = Enumerable.Empty<string>().ToArray();

        public string Priority { get; set; } = "0";

        public string Category { get; set; }

        public bool DefaultTenantOnly { get; set; }

        public bool ManageDisallowed { get; set; }
    }
}
