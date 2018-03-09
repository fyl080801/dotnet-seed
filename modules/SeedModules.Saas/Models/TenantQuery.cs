using Seed.Mvc.Models;

namespace SeedModules.Saas.Models
{
    public class TenantQueryModel : ListQueryModel
    {
        public string Keyword { get; set; }

        public bool Enabled { get; set; }
    }
}