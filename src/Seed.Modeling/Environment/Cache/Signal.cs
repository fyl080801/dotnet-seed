using Microsoft.Extensions.Primitives;
using System.Collections.Concurrent;
using System.Threading;

namespace Seed.Environment.Cache
{
    public class Signal : ISignal
    {
        private readonly ConcurrentDictionary<string, ChangeTokenInfo> _changeTokens;

        public Signal()
        {
            _changeTokens = new ConcurrentDictionary<string, ChangeTokenInfo>();
        }

        public IChangeToken GetToken(string key)
        {
            return _changeTokens.GetOrAdd(
                key,
                token =>
                {
                    var cancellationTokenSource = new CancellationTokenSource();
                    return new ChangeTokenInfo(new CancellationChangeToken(cancellationTokenSource.Token), cancellationTokenSource);
                }).ChangeToken;
        }

        public void SignalToken(string key)
        {
            if (_changeTokens.TryRemove(key, out ChangeTokenInfo changeTokenInfo))
            {
                changeTokenInfo.TokenSource.Cancel();
            }
        }

        private struct ChangeTokenInfo
        {
            public ChangeTokenInfo(IChangeToken changeToken, CancellationTokenSource tokenSource)
            {
                ChangeToken = changeToken;
                TokenSource = tokenSource;
            }

            public IChangeToken ChangeToken { get; }

            public CancellationTokenSource TokenSource { get; }
        }
    }
}
