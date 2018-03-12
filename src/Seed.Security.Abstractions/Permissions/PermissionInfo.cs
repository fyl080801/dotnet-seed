using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Seed.Security.Permissions
{
    public class PermissionInfo
    {
        public const string ClaimType = "Permission";

        public PermissionInfo(string name)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }

        public PermissionInfo(string name, string description) : this(name)
        {
            Description = description;
        }

        public PermissionInfo(string name, string description, IEnumerable<PermissionInfo> includeBy) : this(name, description)
        {
            IncludeBy = includeBy;
        }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Help { get; set; }

        public string Category { get; set; }

        public IEnumerable<PermissionInfo> IncludeBy { get; set; }

        public static implicit operator Claim(PermissionInfo p) => new Claim(ClaimType, p.Name);
    }
}
