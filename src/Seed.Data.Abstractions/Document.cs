using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Seed.Data
{
    [Table("_Document")]
    public class Document
    {
        public Document() { }

        public Document(EntityBase entity)
        {
            Id = entity.Id;
            Type = entity.GetType().FullName;
            Content = JObject.FromObject(entity).ToString();
        }

        public TEntity ToEntity<TEntity>() where TEntity : EntityBase
        {
            var entity = JObject.Parse(Content).ToObject<TEntity>();
            entity.Id = Id;
            return entity;
        }

        [Key]
        public int Id { get; set; }

        [Required, MaxLength(500)]
        public string Type { get; set; }

        public string Content { get; set; }
    }

    public class DocumentMapping : IEntityTypeConfiguration<Document>
    {
        public void Configure(EntityTypeBuilder<Document> builder)
        {

        }
    }
}
