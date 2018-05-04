using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SeedModules.OAuth.Domain
{
    [Table("OAuthApplication")]
    public class OAuthApplication
    {
        [Key]
        public int Id { get; set; }

        public string ClientId { get; set; }

        public string ClientSecret { get; set; }

        public string DisplayName { get; set; }

        public string RedirectUrl { get; set; }
    }
}
