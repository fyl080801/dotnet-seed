using System.Threading.Tasks;

namespace Seed.Environment.Plugins.Features
{
    public interface IFeatureHash
    {
        Task<int> GetFeatureHashAsync();

        Task<int> GetFeatureHashAsync(string featureId);
    }
}
