using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Cardelementimages
    {
        public int Id { get; set; }
        public int? Cardelementid { get; set; }
        public string Imagedata { get; set; }
    }
}
