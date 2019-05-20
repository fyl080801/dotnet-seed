using System.Threading.Tasks;

namespace SeedCore.Addon.Features
{
    public interface IFeatureHash
    {
        Task<int> GetFeatureHashAsync();

        Task<int> GetFeatureHashAsync(string featureId);

    }
}
