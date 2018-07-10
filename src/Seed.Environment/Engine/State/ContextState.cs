using System;
using System.Collections.Generic;
using System.Threading;

namespace Seed.Environment.Engine.State
{
    public class ContextState<T> where T : class
    {
        private readonly string _name;
        private readonly Func<T> _defaultValue;

        public ContextState(string name)
        {
            _name = name;
        }

        public ContextState(string name, Func<T> defaultValue)
        {
            _name = name;
            _defaultValue = defaultValue;
        }

        private readonly AsyncLocal<IDictionary<string, T>> _serviceProvider = new AsyncLocal<IDictionary<string, T>>();

        public T GetState()
        {
            if (_serviceProvider.Value != null)
            {
                if (_serviceProvider.Value.ContainsKey(_name))
                {
                    return _serviceProvider.Value[_name];
                }
            }

            if (_defaultValue != null)
            {
                SetState(_defaultValue());
                return _serviceProvider.Value[_name];
            }

            return default(T);
        }

        public void SetState(T state)
        {
            if (_serviceProvider.Value == null)
            {
                _serviceProvider.Value = new Dictionary<string, T>();
            }

            if (state == null && _serviceProvider.Value.ContainsKey(_name))
            {
                _serviceProvider.Value.Remove(_name);
            }
            else
            {
                _serviceProvider.Value.Add(_name, state);
            }
        }
    }
}