namespace SeedModules.PageBuilder.Models
{
    public class ColumnModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Remark { get; set; }

        public bool PrimaryKey { get; set; }

        public DataTypes Type { get; set; }

        public bool Nullable { get; set; }

        public int? Length { get; set; }

        public int? Accuracy { get; set; }
    }

    public enum DataTypes
    {
        String = 0,
        Int,
        Decimal,
        Datetime
    }
}