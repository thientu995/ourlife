using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Ourlife.Controllers
{
    public class BaseController : Controller
    {
        protected IMemoryCache _cache;
        protected BaseController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }
    }
}