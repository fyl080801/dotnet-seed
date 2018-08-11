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

namespace SeedModules.PageBuilder.Data
{
    public class BuilderTypeConfiguration : IEntityTypeConfiguration<object>// where TEntity : class
    {
        readonly TableModel _tableDefine;

        public BuilderTypeConfiguration(TableModel tableDefine)
        {
            _tableDefine = tableDefine;
        }

        public void Configure(EntityTypeBuilder<object> builder)
        {
            builder.ToTable(_tableDefine.Name);
            builder.HasKey(_tableDefine.Columns.Where(e => e.PrimaryKey).Select(e => e.Name).ToArray());
            foreach (var column in _tableDefine.Columns)
            {
                builder.Property(column.Name)
                    .IsRequired(!column.Nullable);
                //.HasColumnType();
            }
        }
    }
}