using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace SeedCore.Mvc.ModelBinding
{
    public class CheckMarkModelBinderProvider : IModelBinderProvider
    {
        /// <inheritdoc />
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            if (context.Metadata.ModelType == typeof(CheckMarkModelBinder))
            {
                return new CheckMarkModelBinder();
            }

            return null;
        }
    }
}