using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Seed.Mvc.ModelBinding
{
    public static class ModelStateDictionaryExtensions
    {
        public static void AddModelError(this ModelStateDictionary modelState, string prefix, string key, string errorMessage)
        {
            modelState.AddModelError(string.IsNullOrEmpty(prefix) ? key : $"{prefix}.{key}", errorMessage);
        }
    }
}
