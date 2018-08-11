using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Data.Extensions;
using SeedModules.PageBuilder.Models;
using System.Linq;

namespace SeedModules.PageBuilder.Data
{
    public class BuilderTypeConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : class
    {
        readonly TableModel _tableDefine;

        public BuilderTypeConfiguration(TableModel tableDefine)
        {
            _tableDefine = tableDefine;
        }

        public void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.ToTable(_tableDefine.Name);
            builder.HasKey(_tableDefine.Columns.Where(e => e.PrimaryKey).Select(e => e.Name).ToArray());
            _tableDefine.Columns.Where(e => !e.PrimaryKey).ToList().ForEach(column =>
            {
                var pro = builder.Property(PageBuilderDbContext.ConvertType(column), column.Name)
                    .IsRequired(column.IsRequired);
                if (column.Type == DataTypes.String && column.MaxLength.HasValue)
                {
                    pro.HasMaxLength(column.MaxLength.Value);
                }
                if (column.Type == DataTypes.Decimal && column.MaxLength.HasValue && column.Accuracy.HasValue)
                {
                    pro.HasPrecision(column.MaxLength.Value, column.Accuracy.Value);
                }
            });
        }
    }
}