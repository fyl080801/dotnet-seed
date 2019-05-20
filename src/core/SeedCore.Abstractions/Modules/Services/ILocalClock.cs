using System;
using System.Threading.Tasks;

namespace SeedCore.Modules.Services
{
    public interface ILocalClock
    {
        Task<DateTimeOffset> LocalNowAsync { get; }

        Task<ITimeZone> GetLocalTimeZoneAsync();

        Task<DateTimeOffset> ConvertToLocalAsync(DateTimeOffset dateTimeOffset);

        Task<DateTime> ConvertToUtcAsync(DateTime dateTime);
    }
}
