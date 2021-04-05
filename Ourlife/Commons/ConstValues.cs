using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Ourlife.Commons
{
    public class ConstValues
    {
        public struct UrlApi
        {
            public const string IPInfo = "http://ip-api.com/line/{0}";//{0}: Ip Address
            public const string Weather = "http://weather.service.msn.com/data.aspx?weasearchstr={0}&culture={1}&weadegreetype=C&src=outlook";
        }
        //https://www.google.com/maps/place/10%C2%B038'06.0%22N+105%C2%B023'28.0%22E/@10.5826829,105.3834025,11.92z/data=!4m5!3m4!1s0x0:0x0!8m2!3d10.635!4d105.3911111
        public static readonly List<string> lstFolderRoot = new List<string>() {
                Directory.GetCurrentDirectory(),
                "wwwroot",
        };

        public static TimeSpan tsExpCache
        {
            get { return ConstValues.dtExpCache.TimeOfDay; }
        }

        public static DateTime dtExpCache
        {
            get { return DateTime.Now.Date.AddDays(1).AddTicks(-1); }
        }

        public const float lat_DongThap = 10.5826829f;
        public const float lon_DongThap = 105.3834025f;

        public const string symbol_spaceFolder = "_";
        public const string formatFolderName_DateTime = "yyyyMMdd";

        public const string folderName_RootStore = "dataCache";
        public const string folderName_Image = "image";
        public const string folderName_Image_NoGroup = "_nogroup";
        public const string folderName_Store = "store";
        public const string folderName_Logs = "logs";
    }
}
