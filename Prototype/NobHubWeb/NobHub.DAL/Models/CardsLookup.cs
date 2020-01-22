using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class CardsLookup
    {
        public int CardId { get; set; }
        public string Cardname { get; set; }
        public string Cardnameback { get; set; }
        public int? Category { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
        public int? Borderradious { get; set; }
        public string Cardfrontfile { get; set; }
        public string Cardbackfile { get; set; }
    }
}
