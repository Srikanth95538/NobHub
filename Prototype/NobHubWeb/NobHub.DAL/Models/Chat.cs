using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Chat
    {
        public long Guid { get; set; }
        public int Refid { get; set; }
        public string Message { get; set; }
        public long Inputby { get; set; }
        public string Datetime { get; set; }
        public string Receivedtime { get; set; }
        public string Msgtype { get; set; }
        public string Status { get; set; }
        public string RefidStatus { get; set; }
        public string InputbyStatus { get; set; }
        public string ChatDes { get; set; }
        public string Cstatus { get; set; }
    }
}
