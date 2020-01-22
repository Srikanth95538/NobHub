using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Invites
    {
        public int Guid { get; set; }
        public string Refid { get; set; }
        public string Fromdes { get; set; }
        public string Fromstatus { get; set; }
        public string Chatdes { get; set; }
        public string Cid { get; set; }
        public string Cdes { get; set; }
        public string Cstatus { get; set; }
        public string Inviteddate { get; set; }
        public string Accepteddate { get; set; }
        public string Fromreadstatus { get; set; }
        public string Creadstatus { get; set; }
        public string Custommsg { get; set; }
        public string RefidNickname { get; set; }
        public string CidNickname { get; set; }
        public string RefidBlock { get; set; }
        public string CidBlock { get; set; }
        public DateTime? Date { get; set; }
    }
}
