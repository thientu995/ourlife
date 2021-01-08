using System;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Ourlife.Commons;
using Ourlife.Models;

namespace Ourlife.Controllers
{
    [Route("api/[controller]")]
    public class GetDataController : BaseController
    {
        public GetDataController(IMemoryCache memoryCache) : base(memoryCache)
        { }

        [HttpPost("[action]")]
        public async Task<IActionResult> FirebaseDB(ParamFirebaseDB param)
        {
            if (string.IsNullOrWhiteSpace(param.collection))
            {
                return null;
            }
            string fileName = param.collection + ConstValues.symbol_spaceFolder + param.doc + ".json";
            string cacheEntry = await GetCacheAsync(fileName, async () =>
            {
                return await new FirebaseModel().GetData(param, fileName);
            });
            return File(await System.IO.File.ReadAllBytesAsync(cacheEntry), "application/json; charset=utf-8");
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Image(string id, string group)
        {
            string cacheEntry = GetCache(group + id, () =>
            {
                return new GooglePhotoModel().GetData(id, group);
            });
            return File(await System.IO.File.ReadAllBytesAsync(cacheEntry), "image/jpeg");
        }

        [HttpPost("[action]")]
        public IActionResult Date()
        {
            long UnixEpochTicks = (new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks;
            return Json((DateTime.Now.ToUniversalTime().Ticks - UnixEpochTicks) / 10000);
        }
    }
}
