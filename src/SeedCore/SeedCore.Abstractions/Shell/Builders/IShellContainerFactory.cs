using System;
using SeedCore.Shell.Builders.Models;

namespace SeedCore.Shell.Builders
{
    public interface IShellContainerFactory
    {
        IServiceProvider CreateContainer(ShellSettings settings, ShellBlueprint blueprint);
    }
}