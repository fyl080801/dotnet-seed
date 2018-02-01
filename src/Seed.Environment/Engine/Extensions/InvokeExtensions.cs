using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Extensions
{
    public static class InvokeExtensions
    {
        public static async Task InvokeAsync<TEvents>(this IEnumerable<TEvents> events, Func<TEvents, Task> dispatcher, ILogger logger)
        {
            foreach (var evt in events)
            {
                try
                {
                    await dispatcher(evt);
                }
                catch (Exception ex)
                {
                    HandleException(ex, logger, typeof(TEvents).Name, evt.GetType().FullName);
                }
            }
        }

        public static async Task<IEnumerable<TResult>> InvokeAsync<TEvents, TResult>(this IEnumerable<TEvents> events, Func<TEvents, Task<IEnumerable<TResult>>> dispatch, ILogger logger)
        {
            var results = new List<TResult>();

            foreach (var sink in events)
            {
                try
                {
                    results.AddRange(await dispatch(sink));
                }
                catch (Exception ex)
                {
                    HandleException(ex, logger, typeof(TEvents).Name, sink.GetType().FullName);
                }
            }

            return results;
        }

        public static void HandleException(Exception ex, ILogger logger, string sourceType, string method)
        {
            if (IsLogged(ex))
            {
                logger.LogError(string.Format("{2} thrown from {0} by {1}",
                    sourceType,
                    method,
                    ex.GetType().Name), ex);
            }

            if (ex.IsFatal())
            {
                throw ex;
            }
        }

        private static bool IsLogged(Exception ex)
        {
            return !ex.IsFatal();
        }
    }
}
