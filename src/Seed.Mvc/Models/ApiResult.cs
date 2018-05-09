namespace Seed.Mvc.Models
{
    public class ApiResult
    {
        public ApiResult(bool success = true)
        {
            Success = success;
        }

        public bool Success { get; set; }

        public object Data { get; set; }

        public string Message { get; set; }
    }
}