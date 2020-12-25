using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Ourlife.Commons;

namespace Ourlife.Controllers
{
    public class ClearDataController : BaseController
    {
        public ClearDataController(IMemoryCache memoryCache) : base(memoryCache)
        {
        }

        public IActionResult Index()
        {
            string dtCurrent = DateTime.Now.ToString("yyyyMMdd");
            string pathStore = ConstFuncs.GetPathFolderRoot("dataStore", dtCurrent);
            System.IO.Directory.Move(pathStore, pathStore + "_Clear_" + DateTime.Now.Ticks);

            foreach (var element in MemoryCache.)
            {
                _cache.Remove(element.Key);
            }
            return Redirect("~/");
        }
    }
}