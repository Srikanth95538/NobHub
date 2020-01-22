using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Profession
    {
        public int Guid { get; set; }
        public string Label { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
    }
}
