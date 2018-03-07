using Seed.Mvc.Models;

namespace SeedModules.Saas.Models
{
    public class TenantQueryModel : QueryModel
    {
        public string Keyword { get; set; }

        public bool Enabled { get; set; }
    }
}