using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Admin.Models
{
    public class LoginResult
    {
        public LoginResult(bool success = false)
        {
            Success = success;
        }

        public string ReturnUrl { get; set; }

        public bool Success { get; set; }
    }
}
