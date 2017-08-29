﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Abstractions.Engine
{
    public class EngineFeature
    {
        public EngineFeature()
        {

        }

        public EngineFeature(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
    }
}
