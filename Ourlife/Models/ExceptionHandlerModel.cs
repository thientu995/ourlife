using Microsoft.AspNetCore.Http;
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
        public string RequestInformation { get; set; }
        //public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
        private HttpContext httpcontext;
        public ExceptionHandlerModel(HttpContext context)
        {
            httpcontext = context;
            RequestStatusCode = context.Response.StatusCode;
            RequestInformation = GetHTML();
            //if (SendMail)
            //    new SendEmail(Lang.Error + " " + RequestMsg, RequestInformation).sendError();
        }

        private string GetHTML()
        {
            StringBuilder infoDetail = new StringBuilder();
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
            if (false && exceptionFeature != null)
            {

                foreach (PropertyInfo item in exceptionFeature.Error.GetType().GetProperties())
                    infoDetail.Append("<tr><td>" + item.Name + "</td><td>" + item.GetValue(exceptionFeature.Error, null) + "</td></tr>");

                infoDetail.Append("<tr><td>Error Message: </td><td>" + exceptionFeature.Error.Message + "</td></tr>");

                if (!string.IsNullOrEmpty(exceptionFeature.Path))
                    infoDetail.Append("<tr><td>Path Error: </td><td>" + exceptionFeature.Path + "</td></tr>");
            }
            else
            {
                infoDetail.Append(@"<tr><td colspan=""2"">No details</td></tr>");
            }
            infoDetail.Append(@"</tbody></table>");
            string folderLogDate = ConstFuncs.GetPathFolderRoot("dataLogs", DateTime.Now.ToString("yyyyMMdd"));
            File.WriteAllTextAsync(Path.Combine(folderLogDate, DateTime.Now.Ticks + ".html"), infoDetail.ToString());
            return "Error " + this.RequestStatusCode + "!";

        }
    }
}
