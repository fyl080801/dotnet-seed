using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace SeedModules.PageBuilder.Internals.Dynamic
{
    /// <summary>
    /// 定义一个动态类型的基类
    /// 处理生成类型的通用方法
    /// </summary>
    public abstract class DynamicClass
    {
        public override string ToString()
        {
            var props = this.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public);
            var sb = new StringBuilder();
            sb.Append("{");
            for (int i = 0; i < props.Length; i++)
            {
                if (i > 0) sb.Append(", ");
                sb.Append(props[i].Name);
                sb.Append("=");
                sb.Append(props[i].GetValue(this, null));
            }
            sb.Append("}");
            return sb.ToString();
        }
    }
}
