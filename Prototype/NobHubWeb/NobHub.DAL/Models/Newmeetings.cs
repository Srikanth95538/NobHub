using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Newmeetings
    {
        public int Guid { get; set; }
        public int Userid { get; set; }
        public string Participant { get; set; }
        public string Title { get; set; }
        public string Host { get; set; }
        public string Notes { get; set; }
        public DateTime EventDate { get; set; }
        public string Duration { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Date { get; set; }
        public string Createdstatus { get; set; }
        public DateTime Createddate { get; set; }
    }
}
