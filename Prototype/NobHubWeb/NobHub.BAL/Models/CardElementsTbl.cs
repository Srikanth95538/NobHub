using System;
using System.Collections.Generic;
using System.Text;

namespace NobHub.BAL.Models
{
  public  class CardElementsTbl
    {
        public int Id { get; set; }
        public string Cardlementtagname { get; set; }
        public int CardId { get; set; }
        public string CardArea { get; set; }
        public int ElementgroupId { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public string FontColor { get; set; }
        public int? FontSize { get; set; }
        public string FontWeight { get; set; }
        public sbyte? TextVertical { get; set; }
        public sbyte? TextHorizontal { get; set; }
        public string IconImageUrl { get; set; }
        public string IconImagePostiion { get; set; }
        public int? IconImageId { get; set; }
        public string Cardelementtext { get; set; }
        public string Elementlineheight { get; set; }
        public int? Borderradious { get; set; }
        public string ElementgropuName { get; set; }
    }
}
