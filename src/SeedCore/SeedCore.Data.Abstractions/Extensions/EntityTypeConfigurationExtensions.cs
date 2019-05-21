using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace SeedCore.Data.Extensions
{
    public static class EntityTypeConfigurationExtensions
    {
        public static PropertyBuilder HasPrecision(this PropertyBuilder propertyBuilder, int precision, int scale)
        {
            ((IInfrastructure<InternalPropertyBuilder>)propertyBuilder).Instance.HasPrecision(precision, scale);
            return propertyBuilder;
        }

        public static PropertyBuilder<TProperty> HasPrecision<TProperty>(this PropertyBuilder<TProperty> propertyBuilder, int precision = 18, int scale = 4)
        {
            ((IInfrastructure<InternalPropertyBuilder>)propertyBuilder).Instance.HasPrecision(precision, scale);
            return propertyBuilder;
        }

        public static InternalPropertyBuilder HasPrecision(this InternalPropertyBuilder propertyBuilder, int precision, int scale)
        {
            propertyBuilder.Relational(ConfigurationSource.Explicit).HasColumnType($"decimal({precision},{scale})");
            return propertyBuilder;
        }
    }
}