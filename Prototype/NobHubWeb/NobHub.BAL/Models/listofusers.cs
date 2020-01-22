using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Newtonsoft.Json;
using NobHub.DAL.Models;

namespace NobHub.BAL.Models
{
   public class listofusers
   {
        nobhubtestContext _context;
        public listofusers()
        {
            _context = new nobhubtestContext();
        }

        public Register GetUserDetailsById(string mobileNumber)
        {
            Register _details = new Register();
            try
            {
                bool has = _context.Register.Any(reg => reg.Mobile == mobileNumber);
                if (has)
                {
                    _details = (from u in _context.Register where u.Mobile == mobileNumber select u).Distinct().FirstOrDefault();
                }                            
                return _details;
            }
            catch(Exception ex)
            {
                throw ex;
            }            
        }
        public Register UserRegistration(UserRegistration _details)
        {
            try
            {                
                Register tblregister = new Register();
                tblregister.Mobile = _details.MobileNumber;
                tblregister.CountryCode = _details.CountryCode;
                tblregister.Name = _details.FirstName;
                tblregister.Lastname = _details.LastName;
                tblregister.Cemail = _details.CompanyEmail;
                tblregister.Caddress = _details.CompanyAddress;
                tblregister.Companyname = _details.CompanyName;
                tblregister.Lati = _details.Lat;
                tblregister.Longi = _details.Lang;
                tblregister.Mycode = _details.MyReferralCode;
                tblregister.Timezone = _details.TimeZone;
                tblregister.Profession = _details.Profession;
                tblregister.Title = _details.JobTitle;
                tblregister.Theme = _details.BusinessCard;
                tblregister.Status = "Verified";
                tblregister.Date = DateTime.Now;
                //tblregister.Deviceid = _details.Deviceid;
                //tblregister.Regid = _details.Regid;
                _context.Register.Add(tblregister);
                _context.SaveChanges();
                //int Id = tblregister.Guid;
                return tblregister;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public bool UpdateMobileNumber(int UserId,string CountryCode, string MobileNumber)
        {
            var _isSaved = false;
            try
            {               
               var _details = (from u in _context.Register where u.Guid == UserId select u).Distinct().FirstOrDefault();
                if(_details!=null)
                {
                    _details.CountryCode = CountryCode;
                    _details.Mobile = MobileNumber;
                    _context.SaveChanges();
                    _isSaved = true;
                    return _isSaved;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return _isSaved;
        }
        public bool CheckMobileNumberExist(string MobileNumber)
        {           
            bool has = _context.Register.Any(reg => reg.Mobile == MobileNumber);
            return has;
        }



   }
}
