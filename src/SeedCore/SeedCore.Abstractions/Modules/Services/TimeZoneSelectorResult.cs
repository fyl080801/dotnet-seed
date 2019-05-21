using System;
using System.Threading.Tasks;

namespace SeedCore.Modules.Services
{
    public class TimeZoneSelectorResult
    {
        public int Priority { get; set; }
        public Func<Task<string>> TimeZoneId { get; set; }
    }
}
