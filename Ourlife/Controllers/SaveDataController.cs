﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ourlife.Models;

namespace Ourlife.Controllers
{
    [Route("api/[controller]")]
    public class SaveDataController : Controller
    {
        [ValidateAntiForgeryToken]
        [HttpPost("[action]")]
        public async Task<IActionResult> Index(string data)
        {
            await new SaveFile(data).Save();
            return Ok();
        }
    }
}
