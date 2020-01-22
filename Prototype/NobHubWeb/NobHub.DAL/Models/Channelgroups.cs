using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Channelgroups
    {
        public int Channelid { get; set; }
        public string Groupname { get; set; }
        public int Groupadminid { get; set; }

        public virtual Channels Channel { get; set; }
    }
}
