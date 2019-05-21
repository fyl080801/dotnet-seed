using System;
using System.Threading.Tasks;
using SeedCore.Modules.Model;

namespace SeedCore.Modules.Services
{
    public static class ClockExtensions
    {
        public static DateTimeOffset ConvertToTimeZone(this IClock clock, DateTime dateTime, ITimeZone timeZone)
        {
            DateTime dateTimeUtc;
            switch (dateTime.Kind)
            {
                case DateTimeKind.Utc:
                    dateTimeUtc = dateTime;
                    break;
                case DateTimeKind.Local:
                    dateTimeUtc = dateTime.ToUniversalTime();
                    break;
                default: //DateTimeKind.Unspecified
                    dateTimeUtc = DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
                    break;
            }

            return clock.ConvertToTimeZone(new DateTimeOffset(dateTimeUtc), timeZone);
        }

        public static Task<DateTimeOffset> ConvertToLocalAsync(this ILocalClock localClock, DateTime dateTime)
        {
            DateTime dateTimeUtc;
            switch (dateTime.Kind)
            {
                case DateTimeKind.Utc:
                    dateTimeUtc = dateTime;
                    break;
                case DateTimeKind.Local:
                    dateTimeUtc = dateTime.ToUniversalTime();
                    break;
                default: //DateTimeKind.Unspecified
                    dateTimeUtc = DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
                    break;
            }

            return localClock.ConvertToLocalAsync(new DateTimeOffset(dateTimeUtc));
        }
    }
}