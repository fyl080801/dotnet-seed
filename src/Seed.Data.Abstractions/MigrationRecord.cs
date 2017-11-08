using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Data
{
    [Table("_MigrationRecord")]
    public class MigrationRecord
    {
        [Key]
        public int Id { get; set; }

        public string FeatureId { get; set; }

        public string MigrationClass { get; set; }

        public int? Version { get; set; }

        public DateTime MigrationTime { get; set; }
    }
}
