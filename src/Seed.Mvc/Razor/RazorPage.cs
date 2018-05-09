using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Mvc.Razor
{
    public abstract class RazorPage<TModel> : Microsoft.AspNetCore.Mvc.Razor.RazorPage<TModel>
    {
        public string FullRequestPath => Context.Request.PathBase + Context.Request.Path + Context.Request.QueryString;
    }

    public abstract class RazorPage : RazorPage<dynamic>
    {

    }
}
