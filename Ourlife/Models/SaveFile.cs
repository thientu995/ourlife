using Ourlife.Commons;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Ourlife.Models
{
    public class SaveFileData
    {
        public string id { get; set; }
        public string name { get; set; }
        public string value { get; set; }
        public List<SaveFileData> data { get; set; }
    }
    public class SaveFile
    {
        private SaveFileData data;
        public SaveFile(string data)
        {
            this.data = Newtonsoft.Json.JsonConvert.DeserializeObject<SaveFileData>(data);
        }
        public async Task<byte[]> Save()
        {
            WebClient client = new WebClient();

            var keyValue = new NameValueCollection();
            foreach (var item in data.data)
            {
                keyValue.Add("entry." + item.id, item.value);
            }

            Uri uri = new Uri("https://docs.google.com/forms/d/" + data.id + "/formResponse");
            
            return await client.UploadValuesTaskAsync(uri, "POST", keyValue);
        }
    }
}
