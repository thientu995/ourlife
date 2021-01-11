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
            string cacheEntry = await GetCacheAsync(fileName, () =>
            {
                return new FirebaseModel().GetData(param, fileName);
            });
            return Content(cacheEntry, "application/json; charset=utf-8");
        }

        [HttpGet("[action]/{group?}/{name?}")]
        public async Task<IActionResult> Image(string name,string id, string group)
        {
            byte[] cacheEntry = await GetCacheAsync(group + name, () =>
            {
                return new GooglePhotoModel().GetData(id, group);
            });
            return File(cacheEntry, "image/jpeg");
        }

        [HttpPost("[action]")]
        public IActionResult Date()
        {
            long UnixEpochTicks = (new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks;
            return Json((DateTime.Now.ToUniversalTime().Ticks - UnixEpochTicks) / 10000);
        }
    }
}
