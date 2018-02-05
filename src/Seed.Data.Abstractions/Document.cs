using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Data.Extensions;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Seed.Data
{
    [Table("Document")]
    public class Document
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(500)]
        public string Type { get; set; }

        public string Content { get; set; }
    }
}