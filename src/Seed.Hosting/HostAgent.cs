using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Environment.Command;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Seed.Hosting
{
    public class HostAgent
    {
        IServiceProvider _serviceProvider;

        TextReader _input;

        TextWriter _output;

        ILogger<HostAgent> _logger;

        public HostAgent(
            IServiceProvider serviceProvider,
            TextReader input,
            TextWriter output)
        {
            _serviceProvider = serviceProvider;
            _input = input;
            _output = output;
            _logger = serviceProvider.GetService<ILoggerFactory>().CreateLogger<HostAgent>();
        }

        public async Task<CommandReturnCodes> RunAsync()
        {
            try
            {
                return await InvokeRunAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(new EventId(), ex, ex.Message);
                return CommandReturnCodes.Error;
            }
        }

        private async Task<CommandReturnCodes> InvokeRunAsync()
        {
            while (true)
            {
                var commandText = await ReadCommandAsync();
                switch (commandText?.ToLowerInvariant())
                {
                    case "q":
                    case "exit":
                    case "quit":
                        return CommandReturnCodes.Ok;
                    case "cls":
                        Console.Clear();
                        break;
                    default:
                        break;
                }
            }
        }

        private async Task<string> ReadCommandAsync()
        {
            await _output.WriteAsync("host>");
            return await _input.ReadLineAsync();
        }

        // private async Task<ReturnCodes> ExecuteCommandAsync()
        // {
        //     await _output.WriteLineAsync("executed...");
        //     return ReturnCodes.Ok;
        // }
    }
}