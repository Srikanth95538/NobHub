using System;
using System.Collections.Generic;
using System.Text;

namespace NobHub.BAL.Models
{
    public class Registration
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public string CountryCode { get; set; }
        public string DeviceId { get; set; }
        public string RegistrationId { get; set; }
        public int UserId { get; set; }
    }
    public class UserRegistration
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNumber { get; set; }
        public string CountryCode { get; set; }
        public string Lat { get; set; }
        public string Lang { get; set; }
        public string TimeZone { get; set; }
        public string CompanyName { get; set; }
        public string CompanyEmail { get; set; }
        public string CompanyAddress { get; set; }
        public string Profession { get; set; }
        public string BusinessCard { get; set; }
        public string JobTitle { get; set; }
        public string MyReferralCode { get; set; }
    }
}
