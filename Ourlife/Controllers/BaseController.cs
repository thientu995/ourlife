using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Net.Http.Headers;
using Ourlife.Commons;

namespace Ourlife.Controllers
{
    public class BaseController : Controller
    {
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
            try
            {
                key = string.Join(ConstValues.symbol_spaceFolder, this.ControllerContext.RouteData.Values) + "_" + key;
                T cacheEntry;
                if (!_cache.TryGetValue(key, out cacheEntry))
                {
                    cacheEntry = await getValue();
                    if (cacheEntry != null)
                    {
                        _cache.Set(key, cacheEntry, setMemoryOption());
                    }
                }
                else
                {
                    Response.Headers.Add("Content-Cached", "true");
                }
                SetHeader();
                return cacheEntry;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        protected T GetCache<T>(string key, Func<T> getValue)
        {
            try
            {
                key = string.Join(ConstValues.symbol_spaceFolder, this.ControllerContext.RouteData.Values) + "_" + key;
                T cacheEntry;
                if (!_cache.TryGetValue(key, out cacheEntry))
                {
                    cacheEntry = getValue();
                    if (cacheEntry != null)
                    {
                        _cache.Set(key, cacheEntry, setMemoryOption());
                    }
                }
                else
                {
                    Response.Headers.Add("Content-Cached", "true");
                }
                SetHeader();
                return cacheEntry;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        private MemoryCacheEntryOptions setMemoryOption()
        {
            return new MemoryCacheEntryOptions().SetSlidingExpiration(ConstValues.tsExpCache);
        }

        private void SetHeader()
        {
            if ((string)Response.Headers[HeaderNames.CacheControl] == null)
            {
                Response.Headers[HeaderNames.CacheControl] = "public,max-age=" + (int)ConstValues.tsExpCache.TotalSeconds + ",must-revalidate";
                Response.Headers[HeaderNames.Expires] = new[] { ConstValues.tsExpCache.TotalSeconds.ToString("R") }; // Format RFC1123
                Response.StatusCode = StatusCodes.Status200OK;
            }
        }
    }
}