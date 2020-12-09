using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Ourlife.Controllers
{
    [Route("api/[controller]")]
    public class GetImageController : Controller
    {
        static CipherSharp.Encryption md5 = new CipherSharp.Encryption(CipherSharp.Encryption.Name.MD5);
        //static CipherSharp.Encryption base64 = new CipherSharp.Encryption(CipherSharp.Encryption.Name.BASE64);
        const string extention = ".jpg";

        [HttpGet, Route("{id}")]
        public IActionResult Index(string id, string group)
        {
            id = "https://" + System.Uri.UnescapeDataString(id);
            return File(new StreamReader(ConvertUrlToFileImage(id, group)).BaseStream, "image/jpeg");
        }

        private string GetArrayPathFileStore(params string[] path)
        {
            List<string> lst = new List<string>() {
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "dataImage",
            };
            lst.AddRange(path ?? new string[] { "" });
            string pathFile = Path.Combine(lst.ToArray());
            if (!Directory.Exists(pathFile))
            {
                Directory.CreateDirectory(pathFile);
            }
            return pathFile;
        }

        private string ConvertUrlToFileImage(string urlOrigin, string group)
        {
            try
            {
                //if (Uri.IsWellFormedUriString(urlOrigin, UriKind.Absolute))
                {
                    string pathFile = Path.Combine(GetArrayPathFileStore(group ?? "_nogroup"), md5.Encrypt(urlOrigin));

                    if (!System.IO.File.Exists(pathFile))
                    {
                        using (WebClient webClient = new WebClient())
                        {
                            byte[] data = webClient.DownloadData(urlOrigin);

                            string type = webClient.ResponseHeaders["content-type"];
                            if (type.IndexOf("image/") == 0)
                            {
                                System.IO.File.WriteAllBytes(pathFile + extention, data);
                            }
                        }
                    }
                    return pathFile + extention;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}