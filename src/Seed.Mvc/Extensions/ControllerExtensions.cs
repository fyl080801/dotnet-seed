using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Seed.Mvc.Models;
using System;
using System.Text;

namespace Seed.Mvc.Extensions
{
    public static class ControllerExtensions
    {
        public static ApiResult Success(this Controller controller, object data = null)
        {
            return new ApiResult()
            {
                Success = true,
                Data = data
            };
        }

        public static ApiResult Error(this Controller controller, string message = null)
        {
            return new ApiResult()
            {
                Success = false,
                Message = message
            };
        }

        public static ApiResult Error(this Controller controller, ModelStateDictionary modelState)
        {
            return new ApiResult()
            {
                Success = false,
                Message = ""
            };
        }
    }
}