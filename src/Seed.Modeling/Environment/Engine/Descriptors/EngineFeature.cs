using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine.Descriptors
{
    public class EngineFeature
    {
        public EngineFeature()
        {

        }

        public EngineFeature(string name)
        {
            Name = name;
        }

        public string Name { get; set; }
    }
}
