using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class CardsCategories
    {
        public int Guid { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public DateTime? Date { get; set; }
    }
}
