using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Meetingalerts
    {
        public int Guid { get; set; }
        public int Meetingid { get; set; }
        public int Host { get; set; }
        public int Userid { get; set; }
        public int Participant { get; set; }
        public string Msg { get; set; }
        public string Status { get; set; }
        public string Readstatus { get; set; }
        public string Alertdate { get; set; }
        public string Sentdate { get; set; }
        public DateTime Date { get; set; }
        public string Custommsg { get; set; }
        public string Systemdate { get; set; }
    }
}
