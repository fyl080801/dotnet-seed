namespace SeedModules.PageBuilder.Models
{
    public class ColumnModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Remark { get; set; }

        public bool PrimaryKey { get; set; }

        public DataTypes Type { get; set; }

        public bool IsRequired { get; set; }

        public int? MaxLength { get; set; }

        public int? Accuracy { get; set; }
    }

    public enum DataTypes
    {
        String = 0,
        Int,
        Decimal,
        Double,
        Datetime
    }
}