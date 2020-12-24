using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
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
            return File(cacheEntry, "image/jpeg");
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Exception(string id)
        {
            try
            {
                var model = new ExceptionHandlerModel();
                System.Text.StringBuilder sb = new System.Text.StringBuilder();
                var allFiles = new ExceptionHandlerModel().GetList();
                bool showError = !string.IsNullOrWhiteSpace(id);
                //foreach (KeyValuePair<string, List<string>> folder in allFiles)
                for (int iFolder = 0; iFolder < allFiles.Count; iFolder++)
                {
                    KeyValuePair<string, List<string>> folder = allFiles.ElementAt(iFolder);
                    sb.Append("<h1>" + Path.GetFileName(folder.Key) + "</h1>");
                    sb.Append("<ol>");
                    //foreach (string file in folder.Value)
                    for (int iFile = 0; iFile < folder.Value.Count; iFile++)
                    {
                        string file = Path.GetFileName(folder.Value[iFile]);
                        string fileName = file.Replace(".html", string.Empty);
                        sb.Append("<li><a href=\"/api/getdata/Exception?id=" + fileName + "\">" + new DateTime(long.Parse(fileName)).ToString("HH:mm:ss") + "</a></li>");
                        if (
                            (showError && fileName == id)
                            || !showError && iFolder + iFile == 0
                            )
                        {
                            sb.Append(await model.GetContent(file));
                        }
                    }
                    sb.Append("</ol>");
                    sb.Append("<hr>");
                }
                return Content(sb.ToString(), "text/html; charset=utf-8");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }

        }
    }
}
