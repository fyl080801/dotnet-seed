using SeedCore.MemberShip.Security.Permissions;

namespace SeedCore.MemberShip.Security
{
    public class StandardPermissions
    {
        public static readonly Permission SiteOwner = new Permission("SiteOwner", "Site Owners Permission");
    }
}
