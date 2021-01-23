using System;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using Ourlife.Commons;
using Ourlife.Models;

namespace Ourlife.Controllers
{
    [Route("api/[controller]")]
    public class GetDataController : BaseController
    {
        bool isLockObject = false;
        private readonly object lockObject = new object();
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (Monitor.IsEntered(this.lockObject))
            {
                Thread.Sleep(1000);
                OnActionExecuting(context);
            }
            else
            {
                Monitor.Enter(this.lockObject, ref isLockObject);
                base.OnActionExecuting(context);
            }
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);
            if (isLockObject)
            {
                Monitor.Exit(this.lockObject);
            }
        }

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
        public async Task<IActionResult> Image(string name, string id, string group)
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

        [HttpPost("[action]")]
        public IActionResult Weather(string culture = "vi-VN")
        {

            weatherdata weatherServer = new WeatherProvider(string.Empty, culture).GetInfoWeather();
            string ipAddress = Request.HttpContext.Connection.RemoteIpAddress?.ToString();
            weatherdata weatherRequest = new WeatherProvider(ipAddress, "vi-VN").GetInfoWeather();
            return Json(new
            {
                server = weatherServer ?? new weatherdata(),
                client = weatherRequest ?? new weatherdata(),
            });
        }
    }
}
