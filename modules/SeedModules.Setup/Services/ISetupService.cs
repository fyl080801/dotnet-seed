using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Setup.Services
{
    public interface ISetupService
    {
        Task<string> SetupAsync(SetupContext context);
    }
}
