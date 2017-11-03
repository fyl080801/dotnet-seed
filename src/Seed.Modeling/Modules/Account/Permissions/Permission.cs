using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Seed.Modules.Account.Permissions
{
    public class Permission
    {
        public const string ClaimType = "Permission";

        public Permission(string name)
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }

        public Permission(string name, string description) : this(name)
        {
            Description = description;
        }

        public Permission(string name, string description, IEnumerable<Permission> includeBy) : this(name, description)
        {
            IncludeBy = includeBy;
        }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public IEnumerable<Permission> IncludeBy { get; set; }

        public static implicit operator Claim(Permission p) => new Claim(ClaimType, p.Name);
    }
}
