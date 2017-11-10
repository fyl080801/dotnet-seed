using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Data.Extensions;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Seed.Data
{
    [Table("_Document")]
    public class Document
    {
        public Document() { }

        public Document(object entity)
        {
            Type = entity.GetType().FullName;
            Content = entity is IEntity ? ((IEntity)entity).Properties.ToString() : JsonConvert.SerializeObject(entity);
        }

        public TEntity ToEntity<TEntity>() where TEntity : class
        {
            var entity = JsonConvert.DeserializeObject<TEntity>(Content);
            var idProperty = typeof(TEntity).GetProperty("Id");
            if (idProperty != null && idProperty.CanWrite)
            {
                idProperty.SetValue(entity, Id);
            }
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
