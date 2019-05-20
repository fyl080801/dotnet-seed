using System;

namespace SeedCore.Modules.Services
{
    public interface IClock
    {
        DateTime UtcNow { get; }

        ITimeZone[] GetTimeZones();

        ITimeZone GetTimeZone(string timeZoneId);

        ITimeZone GetSystemTimeZone();

        DateTimeOffset ConvertToTimeZone(DateTimeOffset dateTimeOffset, ITimeZone timeZone);
    }
}