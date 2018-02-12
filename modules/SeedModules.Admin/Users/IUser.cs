using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Admin.Users
{
    public interface IUser
    {
        int Id { get; set; }

        string Username { get; set; }
    }
}
