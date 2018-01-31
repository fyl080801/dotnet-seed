using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Data
{
    [Table("MigrationRecord")]
    public class MigrationRecord
    {
        [Key]
        public int Id { get; set; }

        public string SnapshotDefine { get; set; }

        public DateTime MigrationTime { get; set; }
    }

    //public class MigrationRecordConfiguration : IEntityTypeConfiguration<MigrationRecord>
    //{
    //    public void Configure(EntityTypeBuilder<MigrationRecord> builder)
    //    {

    //    }
    //}
}
