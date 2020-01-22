using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Channelmessages
    {
        public long Id { get; set; }
        public int Channelid { get; set; }
        public int Userid { get; set; }
        public string Message { get; set; }
        public DateTime Sentdate { get; set; }
    }
}
