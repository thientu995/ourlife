using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Ourlife.Commons;
using Ourlife.Models;

namespace Ourlife.Controllers
{
    //[Microsoft.AspNetCore.Cors.EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class GetDataController : BaseController
    {
        readonly TimeSpan expCache = DateTime.Now.AddDays(1).AddTicks(-1).TimeOfDay;

        public GetDataController(IMemoryCache memoryCache) : base(memoryCache)
        { }

        [HttpPost("[action]")]
        public async Task<IActionResult> FirebaseDB(ParamFirebaseDB param)
        {
            if (string.IsNullOrWhiteSpace(param.collection))
            {
                return null;
            }
            string fileName = param.collection + "_" + param.doc + ".json";
            string key = "GetDataController_FirebaseDB_" + fileName;

            object cacheEntry;
            if (!_cache.TryGetValue(key, out cacheEntry))
            {
                cacheEntry = JsonConvert.DeserializeObject(await new FirebaseModel().GetData(param, fileName));
                _cache.Set(key, cacheEntry, new MemoryCacheEntryOptions().SetSlidingExpiration(expCache));
            }
            else
            {
                Response.Headers.Add("Content-Cached", "true");
            }
            return Json(cacheEntry);
        }

        [HttpPost("[action]")]
        public IActionResult Date()
        {
            long UnixEpochTicks = (new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks;
            return Json((DateTime.Now.ToUniversalTime().Ticks - UnixEpochTicks) / 10000);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Image(string id, string group)
        {
            id = "https://" + Uri.UnescapeDataString(id);
            string key = "GetImageController_Index_" + id;

            byte[] cacheEntry;
            if (!_cache.TryGetValue(key, out cacheEntry))
            {
                cacheEntry = await System.IO.File.ReadAllBytesAsync(await new GooglePhotoModel().GetData(id, group));
                _cache.Set(key, cacheEntry, new MemoryCacheEntryOptions().SetSlidingExpiration(expCache));
            }
            else
            {
                Response.Headers.Add("Content-Cached", "true");
            }
            //Response.Headers.Add(HeaderNames.Expires, expCache.ToString("R"));
            Response.Headers.Add(HeaderNames.CacheControl, "public,max-age=" + (int)expCache.TotalSeconds);
            return File(cacheEntry, "image/jpeg");
        }
    }
}
