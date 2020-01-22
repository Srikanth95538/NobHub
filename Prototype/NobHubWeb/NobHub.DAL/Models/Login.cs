using System;
using System.Collections.Generic;

namespace NobHub.DAL.Models
{
    public partial class Login
    {
        public int Guid { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Securitykey { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
        public DateTime Dateandtime { get; set; }
        public string Centername { get; set; }
    }
}
