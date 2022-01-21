using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Ourlife.Commons;
using Ourlife.Models;

namespace Ourlife.Controllers
{
    [Route("api/[controller]")]
    public class ManageController : BaseController
    {
        public ManageController(IMemoryCache memoryCache) : base(memoryCache)
        {
        }

        [HttpPost("[action]")]
        public IActionResult ClearData()
        {
            string dtCurrent = "";//DateTime.Now.ToString(ConstValues.formatFolderName_DateTime);
            string pathStore = ConstFuncs.GetPathFolderRootStore(ConstValues.folderName_Store, dtCurrent);
            if (System.IO.Directory.Exists(pathStore))
            {
                System.IO.Directory.Delete(pathStore, true);
            }

            if (_cache is MemoryCache memCache)
            {
                memCache.Compact(1.0);
            }
            return Redirect("~/");
        }

        [HttpGet("[action]/{category?}/{id?}")]
        public async Task<IActionResult> GetData(string category, string id)
        {
            try
            {
                var model = new ExceptionHandlerModel(category ?? ConstValues.folderName_Logs);
                System.Text.StringBuilder sb = new System.Text.StringBuilder();
                var allFiles = model.GetList();
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
                        sb.Append("<li><a href=\"?id=" + fileName + "\">" + new DateTime(long.Parse(fileName)).ToString("HH:mm:ss") + "</a></li>");
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