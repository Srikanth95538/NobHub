using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Meetings
    {
        public int Guid { get; set; }
        public string Refid { get; set; }
        public string Title { get; set; }
        public string Loc { get; set; }
        public string Notes { get; set; }
        public string Syear { get; set; }
        public string Smonth { get; set; }
        public string Sday { get; set; }
        public string Shh { get; set; }
        public string Smm { get; set; }
        public string Eyear { get; set; }
        public string Emonth { get; set; }
        public string Eday { get; set; }
        public string Ehh { get; set; }
        public string Emm { get; set; }
        public string Createdstatus { get; set; }
    }
}
