using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Events
{
    public interface INotifyProxy
    {
        IEventBus EventBus { get; set; }
    }
}
