using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeedModules.Admin.Users;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Collections.ObjectModel;
using System.Collections.Specialized;

namespace SeedModules.Admin.Domain
{
    [Table("User")]
    public class User : IUser
    {
        //ObservableCollection<string> _rolenames;

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Username { get; set; }

        [StringLength(20)]
        public string NormalizedUsername { get; set; }

        [StringLength(200)]
        public string Email { get; set; }

        [StringLength(200)]
        public string NormalizedEmail { get; set; }

        [StringLength(500)]
        public string PasswordHash { get; set; }

        [StringLength(500)]
        public string SecurityStamp { get; set; }

        public bool EmailConfirmed { get; set; }

        public virtual List<UserRole> Roles { get; set; } = new List<UserRole>();

        // [StringLength(1000)]
        // public string Roles { get; set; }

        // [NotMapped]
        // public virtual ObservableCollection<string> RoleNames
        // {
        //     get
        //     {
        //         if (_rolenames == null)
        //         {
        //             _rolenames = string.IsNullOrEmpty(Roles)
        //                 ? new ObservableCollection<string>()
        //                 : new ObservableCollection<string>(Roles.Split(',').Where(e => !string.IsNullOrEmpty(e)));
        //             _rolenames.CollectionChanged += RoleNamesChanged;
        //         }
        //         return _rolenames;
        //     }
        //     set
        //     {
        //         _rolenames = value;
        //         _rolenames.CollectionChanged += RoleNamesChanged;
        //         Roles = "," + string.Join(",", _rolenames) + ",";
        //     }
        // }

        public override string ToString()
        {
            return Username;
        }

        // private void RoleNamesChanged(object sender, NotifyCollectionChangedEventArgs e)
        // {
        //     Roles = "," + string.Join(",", RoleNames) + ",";
        // }
    }

    public class UserTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {

        }
    }
}
