using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Ourlife.Commons
{
    public class ConstValues
    {
        public static readonly List<string> lstFolderRoot = new List<string>() {
                Directory.GetCurrentDirectory(),
                "wwwroot",
        };
    }
}
