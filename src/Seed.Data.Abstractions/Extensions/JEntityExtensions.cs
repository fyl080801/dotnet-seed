using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Data.Extensions
{
    public static class JEntityExtensions
    {
        public static T As<T>(this IJEntity entity)
        {
            return entity.As<T>(typeof(T).Name);
        }

        public static T As<T>(this IJEntity entity, string name)
        {
            if (entity.Properties.TryGetValue(name, out JToken value))
            {
                return value.ToObject<T>();
            }

            return default(T);
        }

        public static IJEntity Put<T>(this IJEntity entity, T aspect) where T : new()
        {
            return entity.Put(typeof(T).Name, aspect);
        }

        public static IJEntity Put(this IJEntity entity, string name, object property)
        {
            entity.Properties[name] = JObject.FromObject(property);
            return entity;
        }

        public static IJEntity Alter<TAspect>(this IJEntity entity, string name, Action<TAspect> action) where TAspect : new()
        {
            TAspect obj;

            if (!entity.Properties.TryGetValue(name, out JToken value))
            {
                obj = new TAspect();
            }
            else
            {
                obj = value.ToObject<TAspect>();
            }

            action?.Invoke(obj);

            entity.Put(name, obj);

            return entity;
        }
    }
}
