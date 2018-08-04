using System.ComponentModel.DataAnnotations;

namespace SeedModules.Admin.Models
{
    public class LoginModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool IsRemember { get; set; }
    }
}