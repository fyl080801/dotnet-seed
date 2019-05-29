using SeedCore.Data.Migrations;
using System.Threading.Tasks;

namespace SeedCore.Recipes.Services
{
    public interface IRecipeMigrator
    {
        Task<string> ExecuteAsync(string recipeFileName, IDataMigrator migration);
    }
}
