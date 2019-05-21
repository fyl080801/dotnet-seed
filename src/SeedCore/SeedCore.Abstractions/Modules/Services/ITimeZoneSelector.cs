using System.Threading.Tasks;
using SeedCore.Modules.Services;

namespace SeedCore.Modules
{
    public interface ITimeZoneSelector
    {
        Task<TimeZoneSelectorResult> GetTimeZoneAsync();
    }
}
