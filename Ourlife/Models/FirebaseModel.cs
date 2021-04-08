using Google.Cloud.Firestore;
using Newtonsoft.Json;
using Ourlife.Commons;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
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
        public readonly object locker = new object();

        public async Task<string> GetData(ParamFirebaseDB param, string fileName)
        {
            string result = string.Empty;
            string dtCurrent = DateTime.Now.ToString(ConstValues.formatFolderName_DateTime);
            string pathStore = ConstFuncs.GetPathFolderRootStore(ConstValues.folderName_Store, dtCurrent);
            string pathFull = Path.Combine(pathStore, fileName);
            //if (!Directory.Exists(pathStore))
            //{
            //    Directory.CreateDirectory(pathStore);
            //}
            FileInfo file = new FileInfo(pathFull);
            if (!file.Exists || file.Length == 0)
            {
                using (var tw = new StreamWriter(pathFull, false))
                {
                    result = JsonConvert.SerializeObject(GetDataFirebase(param));
                    await tw.WriteLineAsync(result);
                }

                //using (FileStream fs = file.Create())
                //{
                //    //lock (locker)
                //    {
                //        byte[] bytes = new UTF8Encoding(true).GetBytes(result);
                //        if (bytes != null && bytes.Length != 0)
                //        {
                //            fs.Write(bytes, 0, bytes.Length);
                //        }
                //        else
                //        {
                //            file.Delete();
                //        }
                //        fs.Close();
                //        fs.Dispose();
                //    }
                //}
            }
            else
            {
                result = await File.ReadAllTextAsync(pathFull);
            }
            return result;
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
