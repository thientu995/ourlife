using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Ourlife.Commons
{
    public class ConstFuncs
    {
        public static string GetPathFolderRootStore(params string[] path)
        {
            List<string> lst = new List<string>(ConstValues.lstFolderRoot);
            lst.Add(ConstValues.folderName_RootStore);
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
