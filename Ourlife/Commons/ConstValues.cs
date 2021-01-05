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

        public const string formatFolderName_DateTime = "yyyyMMdd";
        public const string folderName_RootStore = "dataCache";
        public const string folderName_Image = "image";
        public const string folderName_Image_NoGroup = "_nogroup";
        public const string folderName_Store = "store";
        public const string folderName_Logs = "logs";
    }
}
