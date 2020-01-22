using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Devicefcmtoken
    {
        public int Id { get; set; }
        public int Userid { get; set; }
        public string Fcmtoken { get; set; }
    }
}
