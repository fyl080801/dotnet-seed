using Microsoft.AspNetCore.Hosting;
using Seed.Modules.Manifest;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Modules
{
    public class Application
    {
        public const string ModulesPath = ".Modules";

        public const string ModuleName = "Application";

        public const string ExtensionsPath = "extensions";

        public static string ModulesRoot = ModulesPath + "/";

        //

        public string Name { get; }

        public string Path { get; }

        public string Root { get; }

        public Assembly Assembly { get; }

        public IEnumerable<INamedModule> ModuleNames { get; }

        public string ModulePath { get; }

        public string ModuleRoot { get; }

        public string ExtensionPath { get; }

        public Application(IHostingEnvironment environment)
        {
            Name = environment.ApplicationName;
            Path = environment.ContentRootPath;
            Root = Path + '/';
            ExtensionPath = System.IO.Path.Combine(Path, ExtensionsPath);

            Assembly = Assembly.Load(new AssemblyName(Name));

            ModuleNames = Assembly.GetCustomAttributes<ModuleNameAttribute>()
                .Where(m => !string.IsNullOrEmpty(m.Name))
                .Select(m => new NamedModule(m.Name, Assembly.Load(new AssemblyName(m.Name)))).ToList().Concat(new[] { new NamedModule(Name, Assembly) });

            if (Directory.Exists(ExtensionPath))
            {
                var files = Directory.GetFiles(ExtensionPath, "*.dll", SearchOption.AllDirectories).ToList();

                var concurrentQueue = new ConcurrentQueue<Assembly>();
                Parallel.ForEach(files, file =>
                {
                    concurrentQueue.Enqueue(Assembly.LoadFile(file));
                });
                while (concurrentQueue.Count > 0)
                {
                    if (concurrentQueue.TryDequeue(out Assembly extensionAssembly))
                    {
                        if (extensionAssembly.GetCustomAttributes<ModuleAttribute>().Any())
                        {
                            ModuleNames = ModuleNames.Concat(new[] { new NamedModule(extensionAssembly.GetName().Name, extensionAssembly) });
                        }
                    }
                }
            }

            ModulePath = ModulesRoot + Name;
            ModuleRoot = ModulePath + '/';
        }
    }
}
