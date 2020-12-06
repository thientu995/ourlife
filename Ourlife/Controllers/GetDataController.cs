using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ourlife.Controllers
{
    public class ParamFirebaseDB
    {
        public string collection { get; set; }
        public string doc { get; set; }
        public string typeMap { get; set; }
    }

    [Microsoft.AspNetCore.Cors.EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class GetDataController : Controller
    {
        readonly string projectId = "ourlife-t4vn";

        [HttpPost("[action]")]
        public FileResult FirebaseDB(ParamFirebaseDB param)
        {
            if (string.IsNullOrWhiteSpace(param.collection))
            {
                return null;
            }
            string dtCurrent = DateTime.Now.ToString("yyyyMMdd");
            string pathStore = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dataStore", dtCurrent);
            string fileName = param.collection + "_" + param.doc + ".json";
            string pathFull = Path.Combine(pathStore, fileName);
            if (!Directory.Exists(pathStore))
            {
                Directory.CreateDirectory(pathStore);
            }
            if (!System.IO.File.Exists(pathFull))
            {
                string result = JsonConvert.SerializeObject(GetDataFirebase(param));
                System.IO.File.WriteAllText(pathFull, result);
            }
            return File(new StreamReader(pathFull).BaseStream, "application/json");
        }

        [HttpGet("[action]")]
        public IActionResult Image(string id)
        {
            return new GetImageController().Index(id);
        }

        dynamic GetDataFirebase(ParamFirebaseDB param)
        {
            FirestoreDb db = FirestoreDb.Create(projectId);
            CollectionReference coll = db.Collection(param.collection);
            if (!string.IsNullOrWhiteSpace(param.doc))
            {
                DocumentSnapshot documentSnapshot = coll.Document(param.doc).GetSnapshotAsync().Result;
                if (documentSnapshot.Exists)
                {
                    return ConvertToDictionary(documentSnapshot);
                }
            }
            else
            {
                QuerySnapshot snapshot = coll.GetSnapshotAsync().Result;
                Dictionary<string, object> lst = new Dictionary<string, object>();
                foreach (DocumentSnapshot documentSnapshot in snapshot.Documents)
                {
                    if (documentSnapshot.Exists)
                    {
                        Dictionary<string, object> obj = ConvertToDictionary(documentSnapshot);

                        if (param.typeMap == "json")
                        {
                            lst.Add(documentSnapshot.Id, obj);
                        }
                        else
                        {
                            lst.Add(documentSnapshot.Id, obj);
                        }
                    }
                }
                return lst;
            }
            return null;
        }

        Dictionary<string, object> ConvertToDictionary(DocumentSnapshot snap)
        {
            Dictionary<string, object> obj = snap.ToDictionary();
            foreach (var item in obj.Keys.ToList())
            {
                object value = obj.GetValueOrDefault(item);
                if (value != null)
                {
                    if (value is Timestamp)
                    {
                        obj[item] = ((Timestamp)value).ToDateTime();
                    }
                }
            }
            return obj;
        }

    }
}
