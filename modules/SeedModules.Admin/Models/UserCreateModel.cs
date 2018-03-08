using System.ComponentModel.DataAnnotations;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Models
{
    public class UserCreateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}