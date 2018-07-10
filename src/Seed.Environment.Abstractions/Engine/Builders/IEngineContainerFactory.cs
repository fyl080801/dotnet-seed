using Seed.Environment.Engine.Builders.Models;
using System;

namespace Seed.Environment.Engine.Builders
{
    public interface IEngineContainerFactory
    {
        IServiceProvider CreateContainer(EngineSettings settings, EngineSchema schema);
    }
}