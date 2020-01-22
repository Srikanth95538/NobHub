using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Usercardelements
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ElementId { get; set; }
        public int? PositionX { get; set; }
        public int? PositionY { get; set; }
        public int? Height { get; set; }
        public int? Width { get; set; }
        public string FontColor { get; set; }
        public int? FontSize { get; set; }
        public string FontWeight { get; set; }
        public string IconImagePostiion { get; set; }
        public bool? IsHidden { get; set; }
    }
}
