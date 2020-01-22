using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Usermessages
    {
        public int Userid { get; set; }
        public long Messageid { get; set; }
        public bool Isread { get; set; }
    }
}
