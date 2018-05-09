using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.InPathTest.Domain
{
    [Table("PathTest")]
    public class PathTest
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime? CreateTime { get; set; }
    }

    public class PathTestTypeConfiguration : IEntityTypeConfiguration<PathTest>
    {
        public void Configure(EntityTypeBuilder<PathTest> builder)
        {

        }
    }
}