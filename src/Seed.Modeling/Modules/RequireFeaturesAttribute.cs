using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Seed.Modules
{
    /// <summary>
    /// 必要特性
    /// </summary>
    /// <remarks>将 Plugin 的类型声明为必要特性</remarks>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class RequireFeaturesAttribute : Attribute
    {
        public IList<string> RequiredFeatureNames { get; }

        /// <summary>
        /// 标记一个类型并声明特性
        /// </summary>
        /// <param name="featureName"></param>
        public RequireFeaturesAttribute(string featureName)
        {
            RequiredFeatureNames = new string[] { featureName };
        }

        /// <summary>
        /// 声明一个特性使用一组别名
        /// </summary>
        /// <param name="featureName"></param>
        /// <param name="otherFeatureNames"></param>
        public RequireFeaturesAttribute(string featureName, params string[] otherFeatureNames)
        {
            var list = new List<string>(otherFeatureNames)
            {
                featureName
            };

            RequiredFeatureNames = list;
        }

        /// <summary>
        /// 根据类型获取特性的别名
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static IList<string> GetRequiredFeatureNamesForType(Type type)
        {
            var attribute = type.GetTypeInfo().GetCustomAttributes<RequireFeaturesAttribute>(false).FirstOrDefault();

            return attribute?.RequiredFeatureNames ?? Array.Empty<string>();
        }
    }
}
