using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Channels
    {
        public int Channelid { get; set; }

        public virtual Channelgroups Channelgroups { get; set; }
    }
}
