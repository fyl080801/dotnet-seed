using System;
using System.Linq;
using NodaTime;
using NodaTime.TimeZones;
using SeedCore.Modules.Model;

namespace SeedCore.Modules.Services
{
    public class Clock : IClock
    {
        private static Instant CurrentInstant => SystemClock.Instance.GetCurrentInstant();

        /// <inheritdoc />
        public DateTime UtcNow => CurrentInstant.ToDateTimeUtc();

        public ITimeZone[] GetTimeZones()
        {
            var list =
                from location in TzdbDateTimeZoneSource.Default.ZoneLocations
                let zoneId = location.ZoneId
                let tz = DateTimeZoneProviders.Tzdb[zoneId]
                let offset = tz.GetZoneInterval(CurrentInstant).StandardOffset
                orderby offset, zoneId
                select new STimeZone(zoneId, offset, tz);

            return list.ToArray();
        }

        public ITimeZone GetTimeZone(string timeZoneId)
        {
            if (String.IsNullOrEmpty(timeZoneId))
            {
                return GetSystemTimeZone();
            }

            var dateTimeZone = GetDateTimeZone(timeZoneId);

            return CreateTimeZone(dateTimeZone);
        }

        public ITimeZone GetSystemTimeZone()
        {
            var timezone = DateTimeZoneProviders.Tzdb.GetSystemDefault();
            return CreateTimeZone(timezone);
        }

        public DateTimeOffset ConvertToTimeZone(DateTimeOffset dateTimeOffSet, ITimeZone timeZone)
        {
            var offsetDateTime = OffsetDateTime.FromDateTimeOffset(dateTimeOffSet);
            return offsetDateTime.InZone(((STimeZone)timeZone).DateTimeZone).ToDateTimeOffset();
        }

        internal static DateTimeZone GetDateTimeZone(string timeZone)
        {
            if (!String.IsNullOrEmpty(timeZone) && IsValidTimeZone(DateTimeZoneProviders.Tzdb, timeZone))
            {
                return DateTimeZoneProviders.Tzdb[timeZone];
            } 

            return DateTimeZoneProviders.Tzdb.GetSystemDefault();
        }

        private ITimeZone CreateTimeZone(DateTimeZone dateTimeZone)
        {
            if (dateTimeZone == null)
            {
                throw new ArgumentException(nameof(DateTimeZone));
            }

            var offset = dateTimeZone.GetZoneInterval(CurrentInstant).StandardOffset;

            return new STimeZone(dateTimeZone.Id, offset, dateTimeZone);
        }

        private static bool IsValidTimeZone(IDateTimeZoneProvider provider, string timeZoneId)
        {
            return provider.GetZoneOrNull(timeZoneId) != null;
        }
    }
}