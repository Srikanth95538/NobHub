using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NobHub.BAL.Models;
using NobHub.DAL.Models;

namespace NobHubWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        IConfiguration _iconfig;
        IHttpContextAccessor _httpcontextAccessor;
        private readonly IHostingEnvironment _hostingEnvironment;
        public AccountController(IConfiguration iconfig, IHttpContextAccessor httpcontextAccessor, IHostingEnvironment hostingEnvironment)
        {
            _iconfig = iconfig;
            _httpcontextAccessor = httpcontextAccessor;
            _hostingEnvironment = hostingEnvironment;

        }
        nobhubtestContext _context = new nobhubtestContext();
        listofusers _users = new listofusers();

        [HttpPost]
        [Route("GetUserDetailsById")]
        public IActionResult GetUserDetailsById([FromForm]Registration details)
        {
            try
            {
                Logger.Info("GetUserData Method is called..");
                var _listofUsers = _users.GetUserDetailsById(details.MobileNumber);
                return Ok(_listofUsers);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetUserDetailsById method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("UserRegistration")]
        public IActionResult UserRegistration([FromForm]UserRegistration details)
        {
            try
            {
                Logger.Info("UserRegistration Method is called..");
                var _list = _users.UserRegistration(details);
                return Ok(_list);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in UserRegistration method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("UpdateMobileNumber")]
        public IActionResult UpdateMobileNumber([FromForm]Registration registration)
        {
            try
            {
                Logger.Info("UpdateMobileNumber Method is called..");
                bool IsUpdated = _users.UpdateMobileNumber(registration.UserId, registration.CountryCode, registration.MobileNumber);
                return Ok(IsUpdated);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in UpdateMobileNumber method " + ex.Message);
                throw ex;
            }
        }
       [HttpPost]
       [Route("CheckMobileNumberExist")]
       public IActionResult CheckMobileNumberExist([FromForm]Registration registration)
       {
            try
            {
                Logger.Info("CheckMobileNumberExist Method is called..");
                bool IsExist = _users.CheckMobileNumberExist(registration.MobileNumber);
                return Ok(IsExist);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in CheckMobileNumberExist method " + ex.Message);
                throw ex;
            }
       }
    }
}