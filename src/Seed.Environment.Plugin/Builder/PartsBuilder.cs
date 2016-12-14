using System;
using System.Collections.Generic;
using System.Composition.Convention;
using System.Composition.Hosting;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Runtime.Loader;

namespace Seed.Environment.Plugin.Builder
{
    /// <summary>
    /// 解析一个 plugin 中所有包含的 IPlugin 接口实例
    /// </summary>
    public class PartsBuilder : BaseAssembleBuilder, IDescriptorBuilder
    {
        string _pluginPath;

        public PartsBuilder(IDescriptorBuilder builder, string pluginPath) : base(builder)
        {
            _pluginPath = pluginPath.Replace("plugin.json", "");
        }

        public override PluginDescriptor Build()
        {
            var descriptor = base.Build();
            if (!descriptor.IncludePaths.Contains(_pluginPath))
                descriptor.IncludePaths.Add(_pluginPath);
            //if (descriptor.Installed)
            //{
            //var conventions = new ConventionBuilder();
            //conventions.ForTypesDerivedFrom<IPlugin>()
            //    .Export<IPlugin>()
            //    .Shared();
            descriptor.AvailableAssemblies = Directory
                .GetFiles(_pluginPath, "*.dll", SearchOption.AllDirectories)
                .Select(AssemblyLoadContext.Default.LoadFromAssemblyPath)
                .ToList();

            var context = new PluginRunningContext();
            Parallel.ForEach(descriptor.AvailableAssemblies.ToList(), assembly =>
            {
                context.Types = context.Types.Concat(assembly.DefinedTypes.Select(e => e.AsType()).ToList());
            });
            context.Types.Distinct();
            descriptor.Context = context;
            //using (var container = new ContainerConfiguration().WithAssemblies(descriptor.AvailableAssemblies, conventions).CreateContainer())
            //{
            //    var context = new PluginRunningContext(
            //        container.GetExports<IPlugin>().ToList());
            //    descriptor.Context = context;
            //}
            //}
            return descriptor;
        }
    }
}
