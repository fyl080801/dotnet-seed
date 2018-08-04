using System.ComponentModel.DataAnnotations;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Models
{
    public class PersonalNameModel
    {
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
    }
}