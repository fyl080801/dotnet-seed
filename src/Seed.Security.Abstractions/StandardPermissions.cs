using Seed.Security.Permissions;

namespace Seed.Security
{
    public class StandardPermissions
    {
        public static readonly Permission SiteOwner = new Permission("SiteOwner", "系统所有者");
    }
}