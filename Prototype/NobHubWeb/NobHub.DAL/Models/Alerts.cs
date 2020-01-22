using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Alerts
    {
        public int Guid { get; set; }
        public int Userid { get; set; }
        public string Refid { get; set; }
        public string Msg { get; set; }
        public string Readstatus { get; set; }
        public string Alertdate { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
    }
}
