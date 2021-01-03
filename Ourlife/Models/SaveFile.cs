using Ourlife.Commons;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Ourlife.Models
{
    public class SaveFileData
    {
        public string Category { get; set; }
        public string Content { get; set; }
    }
    public class SaveFile
    {
        private SaveFileData data;
        public SaveFile(SaveFileData data)
        {
            this.data = data;
        }
        public void Save()
        {
            string folder = ConstFuncs.GetPathFolderRoot("data" + data.Category, DateTime.Now.ToString("yyyyMMdd"));
            File.WriteAllTextAsync(Path.Combine(folder, DateTime.Now.Ticks + ".html"),  this.data.Content);
        }
    }
}
