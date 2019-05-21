using System;
using Newtonsoft.Json.Linq;

namespace SeedCore.Infrastructure.Entities
{
    public static class JEntityExtensions
    {
        public static T As<T>(this IJEntity entity)
        {
            return entity.As<T>(typeof(T).Name);
        }

        public static T As<T>(this IJEntity entity, string name)
        {
            return entity.Properties.TryGetValue(name, out JToken value)
                ? value.ToObject<T>()
                : default(T);
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
            TAspect obj = entity.Properties.TryGetValue(name, out JToken value)
                ? value.ToObject<TAspect>()
                : new TAspect();

            action?.Invoke(obj);

            entity.Put(name, obj);

            return entity;
        }
    }
}
