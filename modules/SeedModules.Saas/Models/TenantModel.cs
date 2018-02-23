using System.ComponentModel.DataAnnotations;

namespace SeedModules.Saas.Models
{
    public class TenantModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string DatabaseProvider { get; set; }

        public string RequestUrlPrefix { get; set; }

        public string RequestUrlHost { get; set; }

        [Required]
        public string ConnectionString { get; set; }

        [Required]
        public string TablePrefix { get; set; }
    }
}