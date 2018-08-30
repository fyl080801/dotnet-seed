using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.PageBuilder.Internals.Dynamic
{
    public class DynamicProperty
    {
        string name;
        Type type;

        public DynamicProperty(string name, Type type)
        {
            this.name = name ?? throw new ArgumentNullException("name");
            this.type = type ?? throw new ArgumentNullException("type");
        }

        public string Name
        {
            get { return name; }
        }

        public Type Type
        {
            get { return type; }
        }
    }
}
