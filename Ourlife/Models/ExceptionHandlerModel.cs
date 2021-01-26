using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Ourlife.Commons;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Ourlife.Models
{
    public class ExceptionHandlerModel
    {//public string RequestId { get; set; }
        public int RequestStatusCode { get; set; }
        //public long RequestDateTime { get; set; }
        public string RequestInformation { get; set; }
        //public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
        private HttpContext httpcontext;
        private Dictionary<string, string> dicError = new Dictionary<string, string>();
        private StringBuilder infoDetail = new StringBuilder();

        public ExceptionHandlerModel(HttpContext context)
        {
            this.folderName = ConstValues.folderName_Logs;
            httpcontext = context;
            RequestStatusCode = context.Response.StatusCode;
            RequestInformation = GetHTML();
            //if (SendMail)
            //    new SendEmail(Lang.Error + " " + RequestMsg, RequestInformation).sendError();
        }

        public string folderName { get; set; }
        public ExceptionHandlerModel(string folderName)
        {
            this.folderName = folderName;
        }

        private string GetHTML()
        {
            infoDetail.Append(@"
<style>
   table {
      width: 100%;
      border-collapse: collapse;
   }
   th,
   td {
         border: 1px solid black;
      }
</style>
");
            infoDetail.Append(@"<table><thead><tr><th style=""width:30%"">Variable</th><th>Value</th></tr></thead>");
            infoDetail.Append(@"<tbody>");
            var exceptionFeature = httpcontext.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();
            string errorMessage = string.Empty;
            if (exceptionFeature != null)
            {

                foreach (PropertyInfo item in exceptionFeature.Error.GetType().GetProperties())
                {
                    addDictionaray("Exception__" + item.Name, item.GetValue(exceptionFeature.Error, null), item.PropertyType);
                }

                errorMessage = exceptionFeature.Error.Message;
                if (!string.IsNullOrEmpty(exceptionFeature.Path))
                {
                    addDictionaray("Exception__" + nameof(exceptionFeature.Path), exceptionFeature.Path, exceptionFeature.Path.GetType());
                }
            }
            foreach (PropertyInfo item in httpcontext.Request.GetType().GetProperties())
            {
                if (
                    item.Name != nameof(HttpContext.Request.Form)
                    && item.Name != nameof(HttpContext.Request.Query)
                    && item.Name != nameof(HttpContext.Request.QueryString)
                    && item.Name != nameof(HttpContext)
                    && item.Name != nameof(HttpContext.Request.Body)
                    )
                {
                    addDictionaray("Request__" + item.Name, item.GetValue(httpcontext.Request, null), item.PropertyType);
                }
                else
                {
                    if (httpcontext.Request.HasFormContentType && httpcontext.Request.Form != null)
                    {
                        addDictionaray("Request__" + nameof(httpcontext.Request.Form), httpcontext.Request.Form, httpcontext.Request.Form.GetType());
                        addDictionaray("Request__" + nameof(httpcontext.Request.Query), httpcontext.Request.Query, httpcontext.Request.Query.GetType());
                        addDictionaray("Request__" + nameof(httpcontext.Request.QueryString), httpcontext.Request.QueryString, httpcontext.Request.QueryString.GetType());
                    }
                }
            }

            //else
            //{
            //    infoDetail.Append(@"<tr><td colspan=""2"">No details</td></tr>");
            //}

             ;
            infoDetail.Append(@"</tbody></table>");
            string folderLogDate = ConstFuncs.GetPathFolderRootStore(this.folderName, DateTime.Now.ToString(ConstValues.formatFolderName_DateTime));
            long RequestDateTime = DateTime.Now.Ticks;
            File.WriteAllTextAsync(Path.Combine(folderLogDate, RequestDateTime + ".html"), infoDetail.ToString());
            File.WriteAllTextAsync(Path.Combine(folderLogDate, RequestDateTime + ".json"), DictionaryToJson(dicError));
            return "<h1>Error " + this.RequestStatusCode + " - " + RequestDateTime + "!</h1>"
                + "<em>" + errorMessage.Replace("\n", "<br>") + "</em>";
        }

        public Dictionary<string, List<string>> GetList()
        {
            Dictionary<string, List<string>> dic = new Dictionary<string, List<string>>();
            IEnumerable<string> arrFolders = new List<string>(Directory.GetDirectories(ConstFuncs.GetPathFolderRootStore(this.folderName))).OrderByDescending(X => X);
            string[] arrFiles = null;
            foreach (string folder in arrFolders)
            {
                arrFiles = Directory.GetFiles(folder, "*.html");
                dic.Add(folder, new List<string>(arrFiles).OrderByDescending(x => x).ToList());
            }
            return dic;
        }

        public Task<string> GetContent(string id)
        {
            try
            {
                return File.ReadAllTextAsync(Path.Combine(ConstFuncs.GetPathFolderRootStore(this.folderName, new DateTime(long.Parse(id.Substring(0, 18))).ToString(ConstValues.formatFolderName_DateTime)), id));
            }
            catch (Exception)
            {
                return Task.FromResult(string.Empty);
            }
        }

        private void addDictionaray(string name, object value, Type type)
        {
            try
            {
                name = name + ":" + type.FullName;
                value = JsonConvert.SerializeObject(value ?? string.Empty);
                dicError.Add(name, (string)value);
                infoDetail.Append("<tr><td>" + name + "</td><td>" + value + "</td></tr>");
            }
            catch (Exception ex)
            {
                name = "Log" + name;
                dicError.Add(name, ex.Message);
                infoDetail.Append("<tr><td>" + name + "</td><td>" + ex.Message + "</td></tr>");
            }

        }

        private string DictionaryToJson(Dictionary<string, string> dict)
        {
            var entries = dict.Select(d => string.Format("{0}: {1}", JsonConvert.SerializeObject(d.Key), d.Value));
            return "{" + string.Join(",", entries) + "}";
        }

    }
}
