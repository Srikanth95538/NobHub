using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Nearbyinvitations
    {
        public int Id { get; set; }
        public int? Fromid { get; set; }
        public string Requestto { get; set; }
        public string Fromstatus { get; set; }
        public string Chatdec { get; set; }
        public int? Touserid { get; set; }
        public string Requestfrom { get; set; }
        public DateTime? Inviteddate { get; set; }
        public DateTime? Accepteddate { get; set; }
        public string Readstatud { get; set; }
        public string Toreadstatus { get; set; }
        public string Custommsg { get; set; }
        public string FromidNickname { get; set; }
        public string ToidNickname { get; set; }
        public string FromidBlock { get; set; }
        public string ToidBlock { get; set; }
        public DateTime? Date { get; set; }
    }
}
