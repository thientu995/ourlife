using Ourlife.Commons;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Ourlife.Models
{
    public class GooglePhotoModel
    {
        const string extention = ".jpg";
        static CipherSharp.Encryption md5 = new CipherSharp.Encryption(CipherSharp.Encryption.Name.MD5);

        public async Task<string> GetData(string urlOrigin, string group)
        {
            try
            {
                //if (Uri.IsWellFormedUriString(urlOrigin, UriKind.Absolute))
                {
                    string pathFile = Path.Combine(ConstFuncs.GetPathFolderRoot("dataImage", group ?? "_nogroup"), md5.Encrypt(urlOrigin));

                    if (!File.Exists(pathFile))
                    {
                        using (WebClient webClient = new WebClient())
                        {
                            byte[] data = await webClient.DownloadDataTaskAsync(urlOrigin);

                            string type = webClient.ResponseHeaders["content-type"];
                            if (type.IndexOf("image/") == 0)
                            {
                                File.Create(pathFile + extention).Close();
                                await File.WriteAllBytesAsync(pathFile + extention, data);
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











        static string convertToUnSign3(string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }

        string ConvertUrlToFileImage(int index, string urlOrigin)
        {
            try
            {
                string pathFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "output");
                //if (!System.IO.File.Exists(pathFile))
                {
                    using (WebClient webClient = new WebClient())
                    {
                        byte[] data = webClient.DownloadData(urlOrigin);
                        string filename = webClient.ResponseHeaders["Content-Disposition"];
                        filename = Regex.Replace(webClient.ResponseHeaders["Content-Disposition"], @"[^\w\d-""; .=]", string.Empty);
                        string fileName = new System.Net.Mime.ContentDisposition(convertToUnSign3(filename)).FileName;
                        if (fileName.Contains("unnamed.png"))
                        {
                            return urlOrigin;
                        }
                        pathFile = Path.Combine(pathFile, fileName.Replace("\"", string.Empty));
                        string type = webClient.ResponseHeaders["content-type"];
                        if (type == "application/zip")
                        {
                            File.WriteAllBytes(pathFile, data);
                            if (!Directory.Exists(pathFile + "_unzip"))
                            {
                                Directory.CreateDirectory(pathFile + "_unzip");
                            }
                            System.IO.Compression.ZipFile.ExtractToDirectory(pathFile, pathFile + "_unzip");
                        }
                        else
                        {
                            System.IO.File.WriteAllBytes(pathFile, data);
                        }
                    }
                }
                return pathFile;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return urlOrigin;
        }



        void Main()
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://photos.google.com/u/2/share/AF1QipOL0BhxbI4osl45zqVCzl3W_O3TNoJKkAdcGwc5Gd7WJxIgnDdLdGNs99Xa-0LJrw?key=UlZVelFoMUNWbllvd0F2SkxZUHV1ZFAtMURjNG1B");
            //HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://photos.google.com/share/AF1QipMP_RatArZGPob_jVwE6J4ibUZdW44h8G5tcvcoAh76amFj2OLacrlXzoBO8f7p1g?key=X21FQVdPcWRQNV9mb0hKZkE1ZHFQWjZjdG5rajZ3");
            request.ProtocolVersion = HttpVersion.Version11;
            request.AllowAutoRedirect = true;
            request.MaximumResponseHeadersLength = int.MaxValue;
            request.MaximumAutomaticRedirections = int.MaxValue;
            request.KeepAlive = true;
            request.Timeout = 120000;
            request.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
            request.UserAgent = "Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)"; ;
            request.ContentType = "text/html;charset=\"utf-8\"";
            request.Method = "GET";
            request.Credentials = CredentialCache.DefaultCredentials;
            //request.ContentLength = new ASCIIEncoding().GetBytes(result.Url).Length;

            HttpWebResponse response = request.GetResponse() as HttpWebResponse;
            StreamReader sr = new StreamReader(response.GetResponseStream());

            string a = sr.ReadToEnd();
            //Regex regex = new Regex(@"(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)");
            Regex regex = new Regex(@"(https:\/\/video-downloads\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)");
            var remath = regex.Matches(a);
            int index = 0;

            List<string> lstUrl = new List<string>();
            foreach (var item in remath)
            {
                if (!lstUrl.Contains(item.ToString()))
                {
                    lstUrl.Add(item.ToString());
                    Console.WriteLine(ConvertUrlToFileImage(index++, item.ToString()));
                }
            }
        }

    }
}
