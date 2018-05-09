using System.ComponentModel.DataAnnotations;
using SeedModules.Security.Domain;

namespace SeedModules.Admin.Models
{
    public class PasswordModel
    {
        public string CurrentPassword { get; set; }

        [Required]
        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }
}