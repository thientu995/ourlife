using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
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


        dynamic GetDataFirebase(ParamFirebaseDB param)
        {
            FirestoreDb db = FirestoreDb.Create(projectId);
            CollectionReference coll = db.Collection(param.collection);
            if (!string.IsNullOrWhiteSpace(param.doc))
            {
                DocumentSnapshot documentSnapshot = coll.Document(param.doc).GetSnapshotAsync().Result;
                if (documentSnapshot.Exists)
                {
                    var result = documentSnapshot.ToDictionary();
                    return result;
                }
            }
            else
            {
                QuerySnapshot snapshot = coll.GetSnapshotAsync().Result;
                List<dynamic> lst = new List<dynamic>();
                foreach (DocumentSnapshot documentSnapshot in snapshot.Documents)
                {
                    if (documentSnapshot.Exists)
                    {
                        Dictionary<string, object> obj = documentSnapshot.ToDictionary();
                        if (param.typeMap == "json")
                        {
                            lst.Add(JsonConvert.DeserializeObject("{" + documentSnapshot.Id + ":" + JsonConvert.SerializeObject(obj, Newtonsoft.Json.Formatting.Indented) + "}"));
                        }
                        else
                        {
                            lst.Add(obj);
                        }
                    }
                }
                return lst;
            }
            return null;
        }

    }
}
