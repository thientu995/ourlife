using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Net.Http.Headers;
using Ourlife.Commons;

namespace Ourlife.Controllers
{
    public class BaseController : Controller
    {
        protected readonly TimeSpan expCache = DateTime.Now.AddDays(1).AddTicks(-1).TimeOfDay;
        protected IMemoryCache _cache;
        protected BaseController(IMemoryCache memoryCache)
        {
            //await antiforgery.ValidateRequestAsync(HttpContext.con);
            _cache = memoryCache;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            //string valueHeader = (string)Request.Headers["referer"];
            //if (string.IsNullOrWhiteSpace(valueHeader))
            //{
            //    valueHeader = (string)Request.Headers["origin"];
            //}
            //if (!string.IsNullOrWhiteSpace(valueHeader) && !valueHeader.StartsWith(Request.Scheme + "://" + Request.Host.Value))
            //{
            //    context.Result = Redirect("/");
            //}
            base.OnActionExecuting(context);
        }

        protected async Task<T> GetCacheAsync<T>(string key, Func<Task<T>> getValue)
        {
            key = string.Join(ConstValues.symbol_spaceFolder, this.ControllerContext.RouteData.Values) + "_" + key;
            T cacheEntry;
            if (!_cache.TryGetValue(key, out cacheEntry))
            {
                cacheEntry = await getValue();
                _cache.Set(key, cacheEntry, new MemoryCacheEntryOptions().SetSlidingExpiration(expCache));
            }
            else
            {
                Response.Headers.Add("Content-Cached", "true");
            }
            //if ((string)Response.Headers[HeaderNames.CacheControl] == null)
            //{
            //    Response.Headers.Add(HeaderNames.CacheControl, "public,max-age=" + (int)expCache.TotalSeconds);
            //}
            return cacheEntry;
        }
    }
}