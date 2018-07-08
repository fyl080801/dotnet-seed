using System.Threading.Tasks;

namespace Seed.Plugins.Features
{
    public interface IFeatureHash
    {
        Task<int> GetFeatureHashAsync();

        Task<int> GetFeatureHashAsync(string featureId);
    }
}
