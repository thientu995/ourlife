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
        public IActionResult Index(string id)
        {
            return File(new StreamReader(ConvertUrlToFileImage(System.Uri.UnescapeDataString(id))).BaseStream, "image/jpeg");
        }

        static private List<string> GetArrayPathFileStore()
        {
            List<string> lst = new List<string>() {
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "dataImage"
            };
            string pathFile = Path.Combine(lst.ToArray());
            if (!Directory.Exists(pathFile))
            {
                Directory.CreateDirectory(pathFile);
            }
            return lst;
        }

        private string ConvertUrlToFileImage(string urlOrigin)
        {
            try
            {
                //if (Uri.IsWellFormedUriString(urlOrigin, UriKind.Absolute))
                {
                    List<string> lstPathFile = GetArrayPathFileStore();
                    lstPathFile.Add(md5.Encrypt(urlOrigin));

                    string pathFile = Path.Combine(lstPathFile.ToArray());
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