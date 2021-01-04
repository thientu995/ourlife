using Google.Cloud.Firestore;
using Newtonsoft.Json;
using Ourlife.Commons;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Ourlife.Models
{
    public class ParamFirebaseDB
    {
        public string collection { get; set; }
        public string doc { get; set; }
        public string typeMap { get; set; }
    }

    public class FirebaseModel
    {
        readonly string projectId = "ourlife-t4vn";

        public async Task<string> GetData(ParamFirebaseDB param, string fileName)
        {
            string result = string.Empty;
            string dtCurrent = DateTime.Now.ToString("yyyyMMdd");
            string pathStore = ConstFuncs.GetPathFolderRoot("dataStore", dtCurrent);
            string pathFull = Path.Combine(pathStore, fileName);
            if (!Directory.Exists(pathStore))
            {
                Directory.CreateDirectory(pathStore);
            }
            if (!System.IO.File.Exists(pathFull))
            {
                result = JsonConvert.SerializeObject(await GetDataFirebase(param));
                await File.WriteAllTextAsync(pathFull, result);
            }
            else
            {
                result = await File.ReadAllTextAsync(pathFull);
            }
            return result;
        }
        async Task<dynamic> GetDataFirebase(ParamFirebaseDB param)
        {
            FirestoreDb db = FirestoreDb.Create(projectId);
            CollectionReference coll = db.Collection(param.collection);
            if (!string.IsNullOrWhiteSpace(param.doc))
            {
                DocumentSnapshot documentSnapshot = await coll.Document(param.doc).GetSnapshotAsync();
                if (documentSnapshot.Exists)
                {
                    return ConvertToDictionary(documentSnapshot);
                }
            }
            else
            {
                QuerySnapshot snapshot = await coll.GetSnapshotAsync();
                Dictionary<string, object> lst = new Dictionary<string, object>();
                foreach (DocumentSnapshot documentSnapshot in snapshot.Documents)
                {
                    if (documentSnapshot.Exists)
                    {
                        Dictionary<string, object> obj = ConvertToDictionary(documentSnapshot);
                        lst.Add(documentSnapshot.Id, obj);
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
