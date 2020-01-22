using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class BusinessCards
    {
        public int CardId { get; set; }
        public string Cardname { get; set; }
        public int? Category { get; set; }
        public int Borderradius { get; set; }
        public string Cardfrontfile { get; set; }
        public string Cardbackfile { get; set; }
        public bool Ispublished { get; set; }
        public int? Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public int? Updatedby { get; set; }
        public DateTime? Updateddate { get; set; }
        public int Usercount { get; set; }
        public bool Isdefault { get; set; }
        public sbyte Cardshape { get; set; }
        public string Statictext { get; set; }
        public string Staticimage { get; set; }
    }
}
