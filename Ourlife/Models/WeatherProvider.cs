using Ourlife.Commons;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Ourlife.Models
{
    [Serializable()]
    [XmlRoot]
    public class weatherdata
    {
        [XmlElement]
        public List<Weather> weather { get; set; }
    }

    public class Weather
    {
        //<weather weatherlocationcode="wc:VMXX0007" weatherlocationname="Ho Chi Minh City, Vietnam" url="http://a.msn.com/54/en-US/ct10.745,106.695?ctsrc=outlook" imagerelativeurl="http://blob.weather.microsoft.com/static/weather4/en-us/" degreetype="C" provider="Foreca" attribution="http://www.foreca.com/" attribution2="Foreca" lat="10.745" long="106.695" timezone="7" alert="" entityid="14080" encodedlocationname="Ho+Chi+Minh+City">
        [XmlAttribute]
        public int entityid { get; set; }
        [XmlAttribute]
        public string weatherlocationcode { get; set; }
        [XmlAttribute]
        public string weatherlocationname { get; set; }
        [XmlAttribute]
        public string degreetype { get; set; }
        [XmlElement]
        public Current current { get; set; }
        [XmlElement]
        public List<Forecast> forecast { get; set; }
    }

    public class Current
    {
        //<current temperature="31" skycode="9" skytext="Mưa Nhỏ" date="2021-01-22" observationtime="13:30:00" observationpoint="119/8B Đường Trần Văn Dư, Phường 15, Hồ Chí Minh, Việt Nam" feelslike="34" humidity="55" winddisplay="9 km/h Tây" day="Thứ Sáu" shortday="T6" windspeed="9 km/h"/>
        [XmlAttribute]
        public int temperature { get; set; }
        [XmlAttribute]
        public int skycode { get; set; }
        [XmlAttribute]
        public string skytext { get; set; }
        [XmlAttribute]
        public DateTime date { get; set; }
        [XmlAttribute]
        public string observationtime { get; set; }
        [XmlAttribute]
        public string observationpoint { get; set; }
        [XmlAttribute]
        public int feelslike { get; set; }
        [XmlAttribute]
        public int humidity { get; set; }
        [XmlAttribute]
        public string day { get; set; }
        [XmlAttribute]
        public string shortday { get; set; }
        [XmlAttribute]
        public string windspeed { get; set; }
        [XmlAttribute]
        public string winddisplay { get; set; }
    }

    public class Forecast
    {
        //<forecast low="24" high="31" skycodeday="30" skytextday="Ít Nắng" date="2021-01-25" day="Thứ Hai" shortday="T2" precip="50"/>
        [XmlAttribute]
        public int low { get; set; }
        [XmlAttribute]
        public int high { get; set; }
        [XmlAttribute]
        public int skycodeday { get; set; }
        [XmlAttribute]
        public string skytextday { get; set; }
        [XmlAttribute]
        public DateTime date { get; set; }
        [XmlAttribute]
        public string day { get; set; }
        [XmlAttribute]
        public string shortday { get; set; }
        [XmlAttribute]
        public string precip { get; set; }
    }

    public class WeatherProvider
    {
        private readonly string ipAddress;
        private readonly (float, float) location;
        private readonly string culture;
        public WeatherProvider(string ipAddress, string culture)
        {
            this.ipAddress = ipAddress;
            this.culture = culture;
            this.location = GetLatAndLonFromIPAddress();
        }

        public weatherdata GetInfoWeather()
        {
            //if (!CheckIpLocal())
            //{
            string query = this.location.ToString().Replace("(", string.Empty).Replace(")", string.Empty);
            string output = GetDataFromWebApi(string.Format(ConstValues.UrlApi.Weather, query, this.culture));
            XmlSerializer ser = new XmlSerializer(new weatherdata().GetType());
            MemoryStream stream = new MemoryStream(Encoding.Unicode.GetBytes(output));
            object obj = ser.Deserialize(stream);
            return (weatherdata)obj;
            //}
            //return null;
        }

        private (float, float) GetLatAndLonFromIPAddress()
        {

            float lat = 0;
            float lon = 0;
            if (this.ipAddress == "default")
            {
                lat = ConstValues.lat_DongThap;
                lon = ConstValues.lon_DongThap;
            }
            else
            {
                try
                {
                    string[] dataIP = GetDataFromWebApi(string.Format(ConstValues.UrlApi.IPInfo, CheckIpLocal() ? string.Empty : this.ipAddress)).Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
                    float.TryParse(dataIP[7], out lat);
                    float.TryParse(dataIP[8], out lon);
                }
                catch { }
            }
            return (lat, lon);
        }

        private string GetDataFromWebApi(string apiUrl)
        {
            try
            {
                using (WebClient webClient = new WebClient())
                {
                    return webClient.DownloadString(apiUrl);
                }
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }

        private bool CheckIpLocal()
        {
            switch (this.ipAddress.Trim())
            {
                case "::1":
                case "127.0.0.1":
                case "0.0.0.0":
                case "localhost":
                case "":
                    return true;
                default:
                    return false;
            }
        }
    }
}
