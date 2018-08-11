using System.Collections.Generic;

namespace SeedModules.PageBuilder.Models
{
    public class TableModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Remark { get; set; }

        public ICollection<ColumnModel> Columns { get; set; } = new HashSet<ColumnModel>();
    }
}