using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Data.Extensions
{
    public static class TypeExtensions
    {
        public static bool HasIdProperty(this Type type)
        {
            var property = type.GetProperty("Id");
            return property != null && property.PropertyType == typeof(int);
        }

        public static int GetIdValue(this Type type, object instance)
        {
            if (!HasIdProperty(type))
                throw new NotSupportedException("未包含 Id 属性, 或 Id 不是数字");
            return (int)type.GetProperty("Id").GetValue(instance);
        }
    }
}
