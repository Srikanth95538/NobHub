using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Cards
    {
        public int Guid { get; set; }
        public string Cardname { get; set; }
        public string Cardnameback { get; set; }
        public int Category { get; set; }
        public string Front { get; set; }
        public string Back { get; set; }
    }
}
