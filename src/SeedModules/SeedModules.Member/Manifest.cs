using SeedCore.Modules.Manifest;

[assembly: Module(
    Name = "Users",
    Author = "",
    Website = "",
    Version = "1.0.0"
)]

[assembly: Feature(
    Id = "SeedModules.Users",
    Name = "Users",
    Description = "",
    Category = "安全"
)]

//[assembly: Feature(
//    Id = "SeedModules.Users.Registration",
//    Name = "用户注册",
//    Description = "",
//    Dependencies = new[] { "SeedModules.Users", "SeedModules.Email" },
//    Category = "安全"
//)]

//[assembly: Feature(
//    Id = "SeedModules.Users.ResetPassword",
//    Name = "重置用户密码",
//    Description = "",
//    Dependencies = new[] { "SeedModules.Users", "SeedModules.Email" },
//    Category = "安全"
//)]

//[assembly: Feature(
//    Id = "SeedModules.Users.TimeZone",
//    Name = "用户时区",
//    Description = "",
//    Category = "安全"
//)]