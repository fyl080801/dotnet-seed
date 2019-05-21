using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Data
{
    public interface IEntityTypeConfigurationProvider
    {
        Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync();
    }
}