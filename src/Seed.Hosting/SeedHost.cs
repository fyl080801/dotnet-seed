using Seed.Environment.Commands;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Seed.Hosting
{
    public class SeedHost
    {
        readonly IServiceProvider _serviceProvider;
        readonly TextReader _input;
        readonly TextWriter _output;

        public SeedHost(IServiceProvider serviceProvider, TextReader input, TextWriter output, string[] args)
        {
            _serviceProvider = serviceProvider;
            _input = input;
            _output = output;
        }

        public Task<CommandReturnCodes> RunAsync()
        {
            try
            {
                return DoRunAsync();
            }
            catch (Exception ex)
            {
                for (; ex != null; ex = ex.InnerException)
                {

                }
                return Task.FromResult(CommandReturnCodes.Fail);
            }
        }

        private async Task<CommandReturnCodes> DoRunAsync()
        {
            CommandReturnCodes result = CommandReturnCodes.Ok;

            //
            await _input.ReadLineAsync();

            return result;
        }
    }
}
