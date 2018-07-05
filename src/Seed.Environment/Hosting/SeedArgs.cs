using PowerArgs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Hosting
{
    [ArgExceptionBehavior(ArgExceptionPolicy.StandardExceptionHandling)]
    public class SeedArgs
    {
        [ArgShortcut("c")]
        public string Config { get; set; }
    }
}
