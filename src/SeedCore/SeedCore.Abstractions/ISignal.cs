using Microsoft.Extensions.Primitives;

namespace SeedCore
{
    public interface ISignal
    {
        IChangeToken GetToken(string key);

        void SignalToken(string key);
    }
}
