using System;
using System.Collections.Generic;
using System.Text;

namespace NobHub.BAL.Models
{
   public class Userdetails
   {
        public string Name { get; set; }
        public string CountryCode { get; set; }
        public string Mobile { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }        
        public string Companyname { get; set; }
        public string Title { get; set; }
        public string Department { get; set; }
        public string Cemail { get; set; }
        public string Website { get; set; }
        public string Caddress { get; set; }
        public string Cmobile { get; set; }       
        public string Lati { get; set; }
        public string Longi { get; set; }
        public bool ReturnValue = false;
        public int Userid { get; set; }
        public Double Distance { get; set; }
        public string UserAddress { get; set; }
        public string Profession { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }
    }
    public class RegisterDeatails
    {
        public int UserId { get; set; }
        public string Theme { get; set; }
    }
    public class NearByProfiles
    {
        public int UserId { get; set; }
        public string Lat { get; set; }
        public string Lang { get; set; }
        public string Dist_Unit { get; set; }
    }
    public class ViewCardForUser
    {
        public string Name { get; set; }
        public string LName { get; set; }
        public string Nickname { get; set; }
        public int UserId { get; set; }
    }
    public class UploadProfile
    {
        public string Imgbase64 { get; set; }
        public string FileName { get; set; }
        public int UserId { get; set; }
    }
}
