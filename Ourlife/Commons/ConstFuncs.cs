using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Net.Http.Headers;
namespace Ourlife.Commons
{
    public static class ConstFuncs
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

        public static void SetResponseHeader(HttpResponse res)
        {
            double durationInSeconds = ConstValues.expCache.TotalSeconds;
            //res.StatusCode = StatusCodes.Status200OK;
            res.Headers[HeaderNames.CacheControl] = "public,max-age=" + (int)durationInSeconds + ",must-revalidate";
            res.Headers[HeaderNames.Expires] = new[] { durationInSeconds.ToString("R") }; // Format RFC1123
        }
    }
}
