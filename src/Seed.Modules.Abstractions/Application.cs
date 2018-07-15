using Microsoft.AspNetCore.Hosting;
using Seed.Modules.Manifest;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Seed.Modules
{
    public class Application
    {
        public const string ModulesPath = ".Modules";
        public const string ModuleName = "Application";
        public static string ModulesRoot = ModulesPath + "/";

        public Application(IHostingEnvironment environment)
        {
            Name = environment.ApplicationName;
            Path = environment.ContentRootPath;
            Root = Path + '/';

            Assembly = Assembly.Load(new AssemblyName(Name));

            var moduleNames = Assembly.GetCustomAttributes<ModuleNameAttribute>()
                .Where(m => !string.IsNullOrEmpty(m.Name))
                .Select(m => m.Name).ToList();

            moduleNames.Add(Name);
            ModuleNames = moduleNames;

            ModulePath = ModulesRoot + Name;
            ModuleRoot = ModulePath + '/';
        }

        public string Name { get; }

        public string Path { get; }

        public string Root { get; }

        public Assembly Assembly { get; }

        public IEnumerable<string> ModuleNames { get; }

        public string ModulePath { get; }

        public string ModuleRoot { get; }
    }
}
