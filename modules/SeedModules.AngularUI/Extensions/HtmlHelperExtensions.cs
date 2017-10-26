using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using SeedModules.AngularUI.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.AngularUI.Extensions
{
    public static class HtmlHelperExtensions
    {
        public static IHtmlContent Tag(this IHtmlHelper htmlHelper, string tag, Dictionary<string, string> options)
        {
            var builder = new TagBuilder(tag);
            foreach (var param in options)
            {
                builder.Attributes.Add(param);
            }
            return builder;
        }

        public static IUIRoot AngularUI(this IHtmlHelper htmlHelper, string src, string main)
        {
            return new AngularUIRoot()
            {
                Src = src,
                DataMain = main
            };
        }
    }
}
