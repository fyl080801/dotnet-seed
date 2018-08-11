using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Data;
using SeedModules.PageBuilder.Models;
using Seed.Data.Extensions;

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
            foreach (var column in _tableDefine.Columns)
            {
                var pro = builder.Property(PageBuilderDbContext.ConvertType(column.Type), column.Name)
                    .IsRequired(column.IsRequired);
                if (column.Type == DataTypes.String && column.MaxLength.HasValue)
                {
                    pro.HasMaxLength(column.MaxLength.Value);
                }
                if (column.Type == DataTypes.Decimal && column.MaxLength.HasValue && column.Accuracy.HasValue)
                {
                    pro.HasPrecision(column.MaxLength.Value, column.Accuracy.Value);
                }
            }
        }
    }
}