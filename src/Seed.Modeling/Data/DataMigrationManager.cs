using Microsoft.CSharp;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;
using Seed.Plugins;
using Seed.Plugins.Feature;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DataMigrationManager : IDataMigrationManager
    {
        readonly IDbContext _dbContext;
        readonly EngineSettings _engineSettings;
        readonly IPluginManager _pluginManager;
        readonly ITypeFeatureProvider _typeFeatureProvider;

        public DataMigrationManager(
            IDbContext dbContext,
            EngineSettings engineDescriptor,
            IPluginManager pluginManager,
            ITypeFeatureProvider typeFeatureProvider)
        {
            _dbContext = dbContext;
            _engineSettings = engineDescriptor;
            _pluginManager = pluginManager;
            _typeFeatureProvider = typeFeatureProvider;
        }

        public Task<IEnumerable<string>> GetFeaturesByUpdateAsync()
        {
            return Task.FromResult(Enumerable.Empty<string>());
        }

        public Task Uninstall(string feature)
        {
            return Task.CompletedTask;
        }

        public Task UpdateAllFeaturesAsync()
        {
            var path = Path.Combine(AppContext.BaseDirectory, "Migrations/" + _engineSettings.Name).Replace("/", "\\");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            return Task.Run(() =>
            {
                using (_dbContext)
                {
                    var assembly = Assembly.GetEntryAssembly();
                    var designTimeServicesBuilder = new DesignTimeServicesBuilder(assembly, new OperationReporter(null));
                    var efServices = designTimeServicesBuilder.Build((DbContext)_dbContext);
                    var scaffolder = efServices.GetService<MigrationsScaffolder>();
                    var assemblyName = assembly.GetName().Name + ".EntityConfigurations." + _engineSettings.Name;
                    var scaffoldMigration = scaffolder.ScaffoldMigration(assemblyName, assemblyName);

                    //scaffolder.Save(
                    //    Path.Combine(path, "..\\"),
                    //    scaffoldMigration,
                    //    path
                    //);

                    //CodeDomProvider compiler = new CSharpCodeProvider();
                    //CompilerParameters comPara = new CompilerParameters
                    //{
                    //    GenerateExecutable = false,
                    //    GenerateInMemory = true,
                    //    OutputAssembly = assemblyName
                    //};
                    //comPara.ReferencedAssemblies.Add("Microsoft.EntityFrameworkCore");
                    //comPara.ReferencedAssemblies.Add("Seed.Data");
                    //comPara.ReferencedAssemblies.Add("System");

                    //var result = compiler.CompileAssemblyFromSource(comPara, new[]
                    //{
                    //    scaffoldMigration.MetadataCode,
                    //    scaffoldMigration.MigrationCode,
                    //    scaffoldMigration.SnapshotCode
                    //});

                    _dbContext.Database.MigrateAsync();
                }
            });
        }

        public Task UpdateAsync(string feature)
        {
            return Task.CompletedTask;
        }

        public Task UpdateAsync(IEnumerable<string> features)
        {
            return Task.CompletedTask;
        }
    }
}