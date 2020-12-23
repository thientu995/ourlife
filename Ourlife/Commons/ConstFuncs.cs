using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Ourlife.Commons
{
    public class ConstFuncs
    {
        public static string GetPathFolderRoot(params string[] path)
        {
            List<string> lst = new List<string>(ConstValues.lstFolderRoot);
            lst.AddRange(path ?? new string[] { "" });
            string pathFile = Path.Combine(lst.ToArray());
            if (!Directory.Exists(pathFile))
            {
                Directory.CreateDirectory(pathFile);
            }
            return pathFile;
        }
    }
}
