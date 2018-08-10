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
    public class PbMigrationRecord
    {
        public int Id { get; set; }

        public string SnapshotDefine { get; set; }

        public DateTime MigrationTime { get; set; }
    }

    // 要想配置管理迁移先要有个迁移表，作为模块数据结构之一生成
    public class PbMigrationRecordTypeConfiguration : IEntityTypeConfiguration<PbMigrationRecord>
    {
        public void Configure(EntityTypeBuilder<PbMigrationRecord> builder)
        {
            builder.ToTable("_PageBuilderMigration")
                .HasKey(e => e.Id);
        }
    }
}
