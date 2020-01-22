using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Nobhubsettings
    {
        public int Id { get; set; }
        public int? DefaulthorizontalcardId { get; set; }
        public int? DefaultverticalcardId { get; set; }
    }
}
