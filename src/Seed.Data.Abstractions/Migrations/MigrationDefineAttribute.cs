using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Data.Migrations
{
    [AttributeUsage(AttributeTargets.Class)]
    public class MigrationDefineAttribute : Attribute
    {
        public string Name { get; private set; }

        public int Version { get; set; }

        public MigrationDefineAttribute(string name)
        {
            Name = name;
        }
    }
}
