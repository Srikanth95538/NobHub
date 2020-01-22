using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Cardelements1
    {
        public int Id { get; set; }
        public string Cardlementtagname { get; set; }
        public string CardId { get; set; }
        public string CardElementId { get; set; }
        public string CardArea { get; set; }
        public string CardElementType { get; set; }
        public string CardElementgroup { get; set; }
        public int? PositionX { get; set; }
        public int? PositionY { get; set; }
        public string Height { get; set; }
        public string Width { get; set; }
        public string FontColor { get; set; }
        public string FontSize { get; set; }
        public string FontWeight { get; set; }
        public string ParentWidth { get; set; }
        public string ParentHeight { get; set; }
        public sbyte? TextVertical { get; set; }
        public sbyte? TextHorizontal { get; set; }
        public string IconImageUrl { get; set; }
        public string IconImagePostiion { get; set; }
        public int? IconImageId { get; set; }
        public string Cardelementtext { get; set; }
        public string Elementlineheight { get; set; }
    }
}
