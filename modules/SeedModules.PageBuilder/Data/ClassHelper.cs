using System;
using System.Collections.Generic;
using System.Reflection;
using System.Reflection.Emit;

namespace SeedModules.PageBuilder.Data
{
    public class ClassHelper
    {
        #region 公有方法

        private ClassHelper() { }

        public static object CreateInstance(Type t)
        {
            return Activator.CreateInstance(t);
        }

        public static object CreateInstance(string className, List<CustPropertyInfo> lcpi)
        {
            var t = BuildType(className);
            t = AddProperty(t, lcpi);
            return Activator.CreateInstance(t);
        }

        public static void SetPropertyValue(object classInstance, string propertyName, object propertSetValue)
        {
            classInstance.GetType().InvokeMember(propertyName, BindingFlags.SetProperty, null, classInstance, new object[] { Convert.ChangeType(propertSetValue, propertSetValue.GetType()) });
        }

        public static object GetPropertyValue(object classInstance, string propertyName)
        {
            return classInstance.GetType().InvokeMember(propertyName, BindingFlags.GetProperty, null, classInstance, new object[] { });
        }

        public static Type BuildType(string className)
        {
            var dynamicName = new AssemblyName($"{Assembly.GetExecutingAssembly().GetName().Name}.Dynamic");
            var myAsmBuilder = AssemblyBuilder.DefineDynamicAssembly(dynamicName, AssemblyBuilderAccess.RunAndCollect);
            var myModBuilder = myAsmBuilder.DefineDynamicModule(dynamicName.Name);
            var myTypeBuilder = myModBuilder.DefineType(className, TypeAttributes.Public);
            return myTypeBuilder.CreateTypeInfo();
        }

        public static Type AddProperty(Type classType, List<CustPropertyInfo> lcpi)
        {
            MergeProperty(classType, lcpi);
            return AddPropertyToType(classType, lcpi);
        }

        public static Type AddProperty(Type classType, CustPropertyInfo cpi)
        {
            var lcpi = new List<CustPropertyInfo>
            {
                cpi
            };

            MergeProperty(classType, lcpi);

            return AddPropertyToType(classType, lcpi);
        }

        public static Type DeleteProperty(Type classType, string propertyName)
        {
            return AddPropertyToType(classType, SeparateProperty(classType, new List<string>
            {
                propertyName
            }));
        }

        public static Type DeleteProperty(Type classType, List<string> ls)
        {
            return AddPropertyToType(classType, SeparateProperty(classType, ls));
        }

        #endregion

        #region 私有方法

        private static void MergeProperty(Type t, List<CustPropertyInfo> lcpi)
        {
            foreach (var pi in t.GetProperties())
            {
                lcpi.Add(new CustPropertyInfo(pi.PropertyType.FullName, pi.Name));
            }
        }

        private static List<CustPropertyInfo> SeparateProperty(Type t, List<string> ls)
        {
            var ret = new List<CustPropertyInfo>();
            foreach (var pi in t.GetProperties())
            {
                foreach (var s in ls)
                {
                    if (pi.Name != s)
                    {
                        ret.Add(new CustPropertyInfo(pi.PropertyType.FullName, pi.Name));
                    }
                }
            }
            return ret;
        }

        private static void AddPropertyToTypeBuilder(TypeBuilder myTypeBuilder, List<CustPropertyInfo> lcpi)
        {
            PropertyBuilder custNamePropBldr;
            MethodBuilder custNameGetPropMthdBldr;
            MethodBuilder custNameSetPropMthdBldr;
            MethodAttributes getSetAttr = MethodAttributes.Public | MethodAttributes.SpecialName | MethodAttributes.HideBySig;
            ILGenerator custNameGetIL;
            ILGenerator custNameSetIL;

            foreach (var cpi in lcpi)
            {
                var customerNameBldr = myTypeBuilder.DefineField(cpi.FieldName, Type.GetType(cpi.Type), FieldAttributes.Private);
                custNamePropBldr = myTypeBuilder.DefineProperty(cpi.PropertyName, PropertyAttributes.HasDefault, Type.GetType(cpi.Type), null);
                custNameGetPropMthdBldr = myTypeBuilder.DefineMethod(cpi.GetPropertyMethodName, getSetAttr, Type.GetType(cpi.Type), Type.EmptyTypes);
                custNameGetIL = custNameGetPropMthdBldr.GetILGenerator();

                try
                {
                    custNameGetIL.Emit(OpCodes.Ldarg_0);
                    //custNameGetIL.Emit(OpCodes.Ldfld, customerNameBldr);  
                    custNameGetIL.Emit(OpCodes.Ldfld, customerNameBldr);
                    custNameGetIL.Emit(OpCodes.Ret);
                }
                catch
                {

                }

                custNameSetPropMthdBldr = myTypeBuilder.DefineMethod(cpi.SetPropertyMethodName, getSetAttr, null, new Type[] { Type.GetType(cpi.Type) });

                custNameSetIL = custNameSetPropMthdBldr.GetILGenerator();

                custNameSetIL.Emit(OpCodes.Ldarg_0);
                custNameSetIL.Emit(OpCodes.Ldarg_1);
                custNameSetIL.Emit(OpCodes.Stfld, customerNameBldr);
                custNameSetIL.Emit(OpCodes.Ret);
                //custNamePropBldr.SetConstant("ceshi");  
                //把创建的两个方法(Get,Set)加入到PropertyBuilder中。  
                custNamePropBldr.SetGetMethod(custNameGetPropMthdBldr);
                custNamePropBldr.SetSetMethod(custNameSetPropMthdBldr);
            }
        }

        public static Type AddPropertyToType(Type classType, List<CustPropertyInfo> lcpi)
        {
            var dynamicName = new AssemblyName($"{Assembly.GetExecutingAssembly().GetName().Name}.Dynamic");
            var myAsmBuilder = AssemblyBuilder.DefineDynamicAssembly(dynamicName, AssemblyBuilderAccess.RunAndCollect);
            var myModBuilder = myAsmBuilder.DefineDynamicModule(dynamicName.Name);
            var myTypeBuilder = myModBuilder.DefineType(classType.FullName, TypeAttributes.Public);
            AddPropertyToTypeBuilder(myTypeBuilder, lcpi);
            return myTypeBuilder.CreateTypeInfo();
        }

        #endregion

        #region 辅助类  

        public class CustPropertyInfo
        {
            public CustPropertyInfo() { }

            public CustPropertyInfo(string type, string propertyName)
            {
                this.Type = type;
                this.PropertyName = propertyName;
            }

            public string Type { get; set; }

            public string PropertyName { get; set; }

            public string FieldName
            {
                get
                {
                    if (PropertyName.Length < 1)
                        return "";
                    return PropertyName.Substring(0, 1).ToLower() + PropertyName.Substring(1);
                }
            }

            public string SetPropertyMethodName
            {
                get { return "set_" + PropertyName; }
            }

            public string GetPropertyMethodName
            {
                get { return "get_" + PropertyName; }
            }
        }

        #endregion
    }
}
