using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using NobHub.BAL.Models;
using NobHub.DAL.Models;


namespace NobHubWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        IConfiguration _iconfig;
        IHttpContextAccessor _httpcontextAccessor;
        private readonly IHostingEnvironment _hostingEnvironment;

        nobhubtestContext _context = new nobhubtestContext();
        SaveCardData _saveData = new SaveCardData();
        string contentRootPath ;

        public CardController(IConfiguration iconfig, IHttpContextAccessor httpcontextAccessor, IHostingEnvironment hostingEnvironment)
        {
            _iconfig = iconfig;
            _httpcontextAccessor = httpcontextAccessor;
            _hostingEnvironment = hostingEnvironment;
            contentRootPath = _hostingEnvironment.ContentRootPath;

        }



        [HttpGet]
        [Route("TestMethod")]
        public IActionResult TestMethod()
        {
            string name = "Srikanth";
            var aa = Directory.GetCurrentDirectory();
            string[] files = Directory.GetFiles(Path.Combine(aa, "wwwroot" + "/uploadimgs/ProfilePictures/"));
            foreach (string file in files)
            {
                var FileName = Path.GetFileNameWithoutExtension(file);
                if(FileName == name)
                {
                   System.IO.File.Delete(file);
                    return Ok(FileName);
                }
            }
            return Ok("Hello");
        }

        [HttpGet]
        [Route("GetCardElementGroups")]
        public IActionResult GetCardElementGroups()
        {
            try
            {
                Logger.Info("GetCardElementGroups method is called...");
                var _list = _saveData.GetCardElementGroups();
                return Ok(_list);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetCardElementGroups method " + ex.Message);
                throw ex;
            }

        }

        [HttpPost]
        [Route("InsertCardElementsData")]
        public IActionResult InsertCardElementsData([FromForm]CardElementsTbl _cardElements)
        {
            try
            {
                Logger.Info("InsertCardElementsData method is called...");
                _saveData.SaveData(_cardElements);
                return Ok("Successfully Inserted");
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in InsertCardElementsData method \n " + ex.Message);
                throw ex;
            }
        }

        [HttpPost]
        [Route("SaveBusinessCard")]
        public async Task<ActionResult> SaveBusinessCard([FromForm] IFormCollection form,[FromForm]BusinessCard _card)
        {
            try
            {
                Logger.Info("SaveBusinessCard method is called...");

                var aa = Directory.GetCurrentDirectory();
                var FrontImagepath = Path.Combine(aa, "wwwroot" + "/uploadimgs/cards/", _card.Cardfrontfile);
                var BackImagepath = Path.Combine(aa, "wwwroot" + "/uploadimgs/cards/", _card.Cardbackfile);
                string webRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/cards/");

                _card.Elements = JsonConvert.DeserializeObject<List<CardElement>>("[" + _card.StrElements + "]",
                    new JsonSerializerSettings
                    {
                        NullValueHandling = NullValueHandling.Ignore
                    });
                var cardData = _saveData.SaveBusinessCard(_card);

                foreach (var file in form.Files)
                {
                    if (file.Name == "cardfront")
                    {
                        string[] files = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/cards/"));
                        foreach (string imgfile in files)
                        {
                            var FileName = Path.GetFileNameWithoutExtension(imgfile);
                            var fileId = FileName.Split("_");
                            if (fileId[0] + fileId[1] == cardData.CardId.ToString() + "F")
                            {
                                System.IO.File.Delete(imgfile);
                            }
                        }

                        var frontpath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/cards/", cardData.CardId +"_F_" + file.FileName);
                        using (var stream = new FileStream(frontpath, FileMode.Create))
                        {
                          await  file.CopyToAsync(stream);
                        }
                    }
                    else if (file.Name == "cardback")
                    {
                        string[] files = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/cards/"));
                        foreach (string imgfile in files)
                        {
                            var FileName = Path.GetFileNameWithoutExtension(imgfile);
                            var fileId = FileName.Split("_");
                            if (fileId[0] + fileId[1] == cardData.CardId.ToString() + "B")
                            {
                                System.IO.File.Delete(imgfile);
                            }
                        }
                        var backpath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/cards/", cardData.CardId + "_B_" + file.FileName);

                        using (var stream = new FileStream(backpath, FileMode.Create))
                        {
                          await  file.CopyToAsync(stream);
                        }
                    }
                    else if (file.Name == "staticimage")
                    {
                        string[] files = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/staticlogos/"));
                        foreach (string imgfile in files)
                        {
                            var FileName = Path.GetFileNameWithoutExtension(imgfile);
                            var fileId = FileName.Split("_");
                            if (fileId[0] == _card.CardId.ToString())
                            {
                                System.IO.File.Delete(imgfile);
                            }
                        }
                        var staticimagepath = Path.Combine(aa, "wwwroot" + "/uploadimgs/staticlogos/" + cardData.CardId + "_L_" + file.FileName);
                        using (var stream = new FileStream(staticimagepath, FileMode.Create))
                        {
                         await  file.CopyToAsync(stream);
                        }
                    }
                }
                if (_card.PickORCloneImg)
                {
                   
                    FileInfo f1 = new FileInfo(FrontImagepath);
                    FileInfo f2 = new FileInfo(BackImagepath);
                    var newfileFrontName = cardData.CardId + "_" + "F_" + _card.Cardfrontfile;
                    var newfileBackName = cardData.CardId + "_" + "B_" + _card.Cardbackfile;
                    if (System.IO.File.Exists(FrontImagepath))
                    {
                        
                        f1.CopyTo(string.Format("{0}{1}", webRoot, newfileFrontName));
                    }
                    if (System.IO.File.Exists(BackImagepath))
                    {
                        
                      f2.CopyTo(string.Format("{0}{1}", webRoot, newfileBackName));
                    }
                }
                    return Ok(cardData);

            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in InsertCardElementsData method \n " + ex.Message);
                throw ex;
            }
        }

        [HttpPost]
        [Route("DeleteCardElementsData")]
        public IActionResult DeleteCardElementsData([FromForm]Lookup _cardElements)
        {
            try
            {
                Logger.Info("DeleteCardElementData method is called...");
                _saveData.DeleteCardElementData(Convert.ToInt32(_cardElements.value));
                return Ok("Successfully deleted");
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in DeleteCardElementData method \n " + ex.Message);
                throw ex;
            }
        }

        [HttpPost]
        [Route("GetCardElementData")]
        public IActionResult GetCardElementData([FromForm]CardsLookup _Card)
        {
            try
            {
                Logger.Info("GetCardElementData method is called...");
                var _listofcardelements = _saveData.GetCardElementData(_Card.CardId);
                return Ok(_listofcardelements);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetCardElementData method " + ex.Message);
                throw ex;
            }
        }
        [HttpGet]
        [Route("GetActiveCards")]
        public IActionResult GetActiveCards()
        {
            try
            {
                Logger.Info("GetActiveCards method is called...");
                var _listofCards = _saveData.GetActiveCards();
                return Ok(_listofCards);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetActiveCards method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("GetActiveCarddetaillsById")]
        public IActionResult GetActiveCarddetaillsById([FromForm]CardsLookup _cardElements)
        {
            try
            {
                Logger.Info("GetActiveCarddetaillsById method is called...");
                var _list = _saveData.GetActiveCarddetaillsById(_cardElements.CardId);
                return Ok(_list);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetActiveCarddetaillsById method " + ex.Message);
                throw ex;
            }

        }

        [HttpPost]
        [Route("UpdateCardDimensions")]
        public IActionResult UpdateCardDimensions([FromForm]CardsLookup _cardElements)
        {
            try
            {
                Logger.Info("UpdateCardDimensions method is called...");
                _saveData.UpdateCardDimensions(_cardElements);
                return Ok("Successfully Inserted");
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in UpdateCardDimensions method \n " + ex.Message);
                throw ex;
            }
        }

        [HttpPost]
        [Route("GetUserDefaultCardByUserId")]
        public IActionResult GetUserDefaultCardByUserId([FromForm]Userdetails User)
        {
            try
            {
                Logger.Info("GetUserDefaultCardById method is called...");
                var _list = _saveData.GetUserDefaultCardById(User.Userid);
                return Ok(_list);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetActiveCarddetaillsById method " + ex.Message);
                throw ex;
            }

        }
        [HttpPost]
        [Route("UploadImageData")]
        public async Task<IActionResult> UploadImageData()
        {
            var _UploadData = HttpContext.Request.Form;
            var _file = HttpContext.Request.Form.Files;

            string webRoot = _hostingEnvironment.WebRootPath;
            
            string root = contentRootPath + _iconfig["ApplicationSettings:FileUploadsPath"].ToString();
            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
            }
            try
            {
                Logger.Info("UploadImageData method is called...");

                foreach (var item in _UploadData.Files)
                {
                    using (FileStream fs = System.IO.File.Create(root + item.FileName))
                    {
                        item.CopyTo(fs);
                        fs.Flush();
                    }


                    string imgBase64String = GetBase64StringForImage(root + item.FileName, item.ContentType);
                    _saveData.SaveImageData(imgBase64String);
                }

            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in UploadImageData method " + ex.Message);
                throw ex;
            }


            return Ok("Hi");
        }
        protected static string GetBase64StringForImage(string imgPath, string mimetype)
        {
            try
            {
                byte[] imageBytes = System.IO.File.ReadAllBytes(imgPath);
                string base64String = Convert.ToBase64String(imageBytes);
                return "data:" + mimetype.Trim() + "; base64," + base64String;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("GetImageBase64data")]
        public IActionResult GetImageBase64data([FromForm]Cardelementimages _images)
        {
            try
            {
                Logger.Info("GetImageBase64data method is called with id..." + _images.Cardelementid.ToString());
                var _imagedata = _saveData.GetImageBase64dataString(_images.Cardelementid);
                return Ok(_imagedata);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetImageBase64data method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("GetUserCardbyUserId")]
        public IActionResult GetUserCardbyUserId([FromForm]Userdetails User)
        {
            try
            {
                Logger.Info("GetUserCardbyUserId method is called by userId" + Convert.ToString(User.Userid));
                var _list = _saveData.GetUserCardbyUserId(User.Userid);
                return Ok(_list);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetUserCardbyUserId method " + ex.Message);
                throw ex;
            }

        }
        [HttpGet]
        [Route("GetIconNames")]
        public IActionResult GetIconNames()
        {
            try
            {
                Logger.Info("GetIconNames method is called...");
                var _listofCards = _saveData.GetIconNames();
                return Ok(_listofCards);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetIconNames method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("UpdateCardThemeforUser")]
        public IActionResult UpdateCardThemeforUser([FromForm]RegisterDeatails _register)
        {
            try
            {
                Logger.Info("UpdateCardThemeforUser method is called...");
                _saveData.UpdateCardThemeforUser(_register.Theme, _register.UserId);
                return Ok("Successfully Updated");
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in UpdateCardThemeforUser method " + ex.Message);
                throw ex;
            }

        }

        [HttpPost]
        [Route("GetIconNameById")]
        public IActionResult GetIconNameById([FromForm] CardiconsLookup cardicons)
        {
            try
            {
                Logger.Info("GetIconNames method is called...");
                var _listofCards = _saveData.GetIconFileName(cardicons.Cardiconid);
                return Ok(_listofCards);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetIconNames method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("GetYesProfiles")]
        public IActionResult GetYesProfiles([FromForm]RegisterDeatails _register)
        {
            try
            {
                Logger.Info("GetYesProfiles method is called....");
                 var _lisfofyesProfiles = _saveData.GetYesProfiles(_register.UserId);
                return Ok(_lisfofyesProfiles);
            }
            catch(Exception ex)
            {
                Logger.Error("Error has occured in GetYesProfiles method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("GetNearByProfiles")]
        public IActionResult GetNearByProfiles([FromForm]NearByProfiles _nearByProfiles)
        {
            try
            {
                Char distUnit = Convert.ToChar(_nearByProfiles.Dist_Unit.ToUpperInvariant());
                Logger.Info("GetNearByProfiles method is called....");
                var _nearByprofiles = _saveData.GetNearByProfiles(_nearByProfiles.UserId, _nearByProfiles.Lat, _nearByProfiles.Lang, distUnit);
                return Ok(_nearByprofiles);
            }
            catch(Exception ex)
            {
                Logger.Error("Error has occured in GetNearByProfiles method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> UploadFiles(IFormCollection form)
        {
            var cardid="";
            foreach (var list in form)
            {
                if (list.Key.ToString() == "CardID")
                {
                     cardid = list.Value;
                }
                

            }
            foreach (var file in form.Files)
            {
                var aa = Directory.GetCurrentDirectory();
                if (file.Name == "image_front")
                {
                    var path = Path.Combine(aa, "wwwroot" + "/uploadimgs/cards/",cardid+"_"+"F_"+ file.FileName);
                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                }
                else if(file.Name == "image_back")
                {
                    var path = Path.Combine(aa, "wwwroot" + "/uploadimgs/cards/", cardid + "_" + "B_" + file.FileName);
                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                }
               
            }

            return this.Ok();
        }
        [HttpGet]
        [HttpGet]
        [Route("GetCardCategories")]
        public IActionResult GetCardCategories()
        {
            try
            {
                Logger.Info("GetCardCategories method is called....");
                var _listofcategories = _saveData.GetAllCategories();
                return Ok(_listofcategories);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetCardCategories method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("ViewCardForUser")]
        public IActionResult ViewCardForUser([FromForm]RegisterDeatails _details)
        {
            try
            {
                Logger.Info("ViewCardForUser method is called....");
                var _userData = _saveData.ViewCardForUser(_details.UserId);
                return Ok(_userData);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in ViewCardForUser method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("UpdateUserNickName")]
        public IActionResult UpdateUserNickName([FromForm]ViewCardForUser _user)
        {
            try
            {
                Logger.Info("UpdateUserNickName method is called....");
                _saveData.UpdateUserNickName(_user.UserId, _user.Nickname);
                 return Ok("Sucessfully Updated");
            }
            catch(Exception ex)
            {
                Logger.Error("Error has occured in UpdateUserNickName method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("UpdateElementDimensions")]
        public IActionResult UpdateElementDimensions([FromForm]UpdateElementDimensions _newDimensions)
        {
            try
            {
                Logger.Info("UpdateElementDimensions method is called....");
                _saveData.UpdateElementDimensions(_newDimensions);
                return Ok("Sucessfully Updated");
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in UpdateElementDimensions method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("GetCardsByCategoryId")]
        public IActionResult GetCardsByCategoryId([FromForm]CardCategories _category)
        {
            try
            {
                Logger.Info("GetCardsByCategoryId method is called....");
                var _cardsCategoryList = _saveData.GetCardsByCategoryId(_category.categorieID);
                return Ok(_cardsCategoryList);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetCardsByCategoryId method " + ex.Message);
                throw ex;
            }
        }
        [HttpGet]
        [Route("GetAllProfessions")]
        public IActionResult GetAllProfessions()
        {
            try
            {
                Logger.Info("GetAllProfessions method is called....");
                var _listofprofessions = _saveData.GetAllProfessions();
                return Ok(_listofprofessions);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetAllProfessions method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("UploadProfilePicture")]
        public async Task<IActionResult> UploadProfilePicture(IFormCollection form)
        {
            try
            {
                Logger.Info("UploadProfilePicture method is called....");
                foreach (var file in form.Files)
                {
                    var aa = Directory.GetCurrentDirectory();

                    var path = Path.Combine(aa, "wwwroot" + "/uploadimgs/ProfilePictures/" + file.FileName);
                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in UploadProfilePicture method " + ex.Message);
                throw ex;
            }


            return this.Ok();
        }
        [HttpPost]
        [Route("UploadPicture")]
        public IActionResult UploadPicture([FromForm]UploadProfile _profile)
        {
            try
            {
                Logger.Info("UploadPicture method is called....");

                var aa = Directory.GetCurrentDirectory();
                string[] files = Directory.GetFiles(Path.Combine(aa, "wwwroot" + "/uploadimgs/ProfilePictures/"));
                foreach (string file in files)
                {
                    var FileName = Path.GetFileNameWithoutExtension(file);
                    if (FileName == _profile.UserId.ToString())
                    {
                        System.IO.File.Delete(file);
                    }
                }
                var _ext = Path.GetExtension(_profile.FileName);
                _profile.FileName = _profile.UserId + _ext;
                var path = Path.Combine(aa, "wwwroot" + "/uploadimgs/ProfilePictures/"+ _profile.FileName);
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
                byte[] imageBytes = Convert.FromBase64String(_profile.Imgbase64);
                System.IO.File.WriteAllBytes(path, imageBytes);
                _saveData.SaveProfilePicture(_profile.UserId,_profile.FileName);
                return Ok("Hello");
               
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in UploadPicture method " + ex.Message);
                throw ex;
            }
        }


        [HttpPost]
        [Route("GetBusinessCardthemeById")]
        public IActionResult GetBusinessCardthemeById([FromForm]BusinessCards card)
        {
            try
            {
                Logger.Info("GetActiveCarddetaillsById method is called...");
                var _list = _saveData.GetBusinessCardthemeById(card.CardId);
                return Ok(_list);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetActiveCarddetaillsById method " + ex.Message);
                throw ex;
            }

        }
        [HttpPost]
        [Route("GetCategoryById")]
        public IActionResult GetCategoryById([FromForm] CardCategories category)
        {

            var data = _saveData.GetCategoryById(category.categorieID);
            return Ok(data);

        }
        [HttpPost]
        [Route("GetProffesionById")]
        public IActionResult GetProffesionById([FromForm] Profession proffesion)
        {

            var data = _saveData.GetProffesionById(proffesion.Guid);
            return Ok(data);

        }
        [HttpPost]
        [Route("GetIconById")]
        public IActionResult GetIconById([FromForm] cardicons icons)
        {

            var data = _saveData.GetIconById(icons.iconId);
            return Ok(data);

        }
        [HttpPost]
        [Route("SendMeetingInvite")]
        public IActionResult SendMeetingInvite([FromForm]MeetingInvitation _invitation)
        {
            try
            {
                Logger.Info("SendMeetingInvite method is called...");
                _saveData.SendMeetingInvite(_invitation);
                return Ok("Invitation");
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in SendMeetingInvite method " + ex.Message);
                throw ex;
            }
        }      
        [HttpPost]
        [Route("GetMeetings")]
        public IActionResult GetMeetings([FromForm]Registration details)
        {
            try
            {
                Logger.Info("GetMeetings method is called...");
                var MeetingsList = _saveData.GetMeetings(details.UserId);
                return Ok(MeetingsList);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetMeetings method " + ex.Message);
                throw ex;
            }
        }
       

        [HttpPost]
        [Route("GetUserFCMToken")]
        public IActionResult GetUserFCMToken([FromForm] useridFCMToken _token)
        {
            try
            {
                Logger.Info("GetUserFCMToken method is called...");
                var data = _saveData.GetUserFCMToken(_token);
                return Ok(data);
            }
            catch(Exception ex)
            {
                Logger.Error("Error has occured in GetUserFCMToken method " + ex.Message);
                throw ex;
            }
           

        }

        //[HttpPost]
        //[Route("CreateChannel")]
        //public IActionResult CreateChannel([FromForm] ChannelForUsers forUsers)
        //{
        //    try
        //    {
        //        Logger.Info("CreateChannel method is called...");
        //        var data = _saveData.createChannel(forUsers);
        //        return Ok(data);
        //    }
        //    catch (Exception ex)
        //    {
        //        Logger.Error("Error has occured in GetUserFCMToken method " + ex.Message);
        //        throw ex;
        //    }


        //}

        [HttpPost]
        [Route("CreateChannel")]
        public IActionResult CreateChannel(int FromuserId,int TouserId)
        {
            try
            {
                Logger.Info("CreateChannel method is called...");
                ChannelForUsers channelusers = new ChannelForUsers();
                channelusers.fromUserID = FromuserId;
                channelusers.toUserId = TouserId;
                var data = _saveData.createChannel(channelusers);
                return Ok(data);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetUserFCMToken method " + ex.Message);
                throw ex;
            }


        }

        [HttpPost]
        [Route("InsertMessage")]
        public IActionResult InsertMessage([FromForm] UserMsg messages)
        {
            try
            {
                Logger.Info("CreateChannel method is called...");
                var data = _saveData.InsertMessage(messages);
                return Ok(data);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetUserFCMToken method " + ex.Message);
                throw ex;
            }


        }
        [HttpPost]
        [Route("sendNearbyInvite")]
        public IActionResult sendNearbyInvite([FromForm]NearbyInvites _invitation)
        {
            try
            {
                Logger.Info("sendNearbyInvite method is called...");                

                var chId = CreateChannel(_invitation.Refid,_invitation.Cid);

                List<string> UserTokens = _saveData.GetUserFCMTokens(_invitation.Cid);

                SendNotification(UserTokens, _invitation.body, _invitation.type, "Nobhub", 0, "", 0);

                _saveData.sendNearbyInvite(_invitation);

                return Ok("Invitation");
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in sendNearbyInvite method " + ex.Message);
                throw ex;
            }
        }

        public IActionResult SendNotification(List<string> userTokens, string bodymsg, string Type, string Title, int channelId, string LoginuserToken, int fromuserId)
        {
            WebRequest tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
            tRequest.Method = "post";
            //serverKey - Key from Firebase cloud messaging server
            // string key = contentRootPath + _iconfig["ApplicationSettings:FCMProjectKey"].ToString();
            string key = "AAAAqz08NJE:APA91bFiu9O2KoU4cXAs7dgX__R-pCyr0vq2RrvFKG4ZjrMvrUhIqyJdp6EzYnnzHE-dAJn4xLtr5sbKI5I2qIaa-Q_CGuNHItUe3WzzxEoNWqd-TIEJXqxlE_LX_8YxtllcRZW4Jpii";
            tRequest.Headers.Add(string.Format("Authorization: key={0}", key));
            //Sender Id - From firebase project setting  
            tRequest.Headers.Add(string.Format("Sender: id={0}", "201182372310"));
            tRequest.ContentType = "application/json";
            var payload = new
            {
                registration_ids = userTokens,
                priority = "high",
                content_available = true,
                notification = new
                {
                    body = bodymsg,
                    title = Title,                   

                },
                data = new
                {
                    text = bodymsg,
                    ChannelId = channelId,
                    type = Type,
                    fromFcmToken = LoginuserToken,
                    fromUserId = fromuserId
                }
        };

            string postbody = JsonConvert.SerializeObject(payload).ToString();
            Byte[] byteArray = Encoding.UTF8.GetBytes(postbody);
            tRequest.ContentLength = byteArray.Length;
            using (Stream dataStream = tRequest.GetRequestStream())
            {
                dataStream.Write(byteArray, 0, byteArray.Length);
                using (WebResponse tResponse = tRequest.GetResponse())
                {
                    using (Stream dataStreamResponse = tResponse.GetResponseStream())
                    {
                        if (dataStreamResponse != null) using (StreamReader tReader = new StreamReader(dataStreamResponse))
                            {
                                String sResponseFromServer = tReader.ReadToEnd();
                                //result.Response = sResponseFromServer;
                            }
                    }
                }
            }

            return Ok("Success");
        }

        [HttpPost]
        [Route("FetchmessagesbyChannelId")]
        public IActionResult FetchmessagesbyChannelId([FromForm]channelmsgs _invitation)
        {
            try
            {
                Logger.Info("FetchmessagesbyChannelId method is called...");
               var channelmsgs= _saveData.FetchmessagesbyChannelId(_invitation);
                    return Ok(channelmsgs);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in FetchmessagesbyChannelId method " + ex.Message);
                throw ex;
            }
        }


        [HttpPost]
        [Route("SaveChannelMessage")]
        public IActionResult SaveChannelMessage([FromForm]channelmsgs msgs)
        {
            try
            {
                Logger.Info("SaveChannelMessage method is called...");
                if (msgs == null)
                {
                    Logger.Info("_invitation message null");
                }
                else
                {
                    try
                    {
                        //msgs.messages = JsonConvert.DeserializeObject<List<channelmessageobj>>(msgs.strmessage,
                        //  new JsonSerializerSettings
                        //  {
                        //      NullValueHandling = NullValueHandling.Ignore
                        //  });
                        //var msgobj = msgs.messages.FirstOrDefault();
                        List<string> UserTokens = _saveData.GetChannelUserTokens(msgs.channelId,msgs.LoginUserFcmToken);
                        SendNotification(UserTokens, msgs.strmessage, "chat", "", msgs.channelId, msgs.LoginUserFcmToken, msgs.FromuserId);
                        _saveData.SaveChannelMessage(msgs);
                    }
                    catch (Exception ex)
                    {
                        Logger.Error("SaveChannelMessage()" + ex.ToString());
                        throw;
                    }

                }
             
                return Ok("Invitation");
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in SaveChannelMessage method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]
        [Route("GetInvitations")]
        public IActionResult GetInvitations([FromForm]RegisterDeatails _details)
        {
            try
            {
                Logger.Info("GetInvitations method is called...");
                var invitations = _saveData.GetInvitations(_details.UserId);
                return Ok(invitations);
            }
            catch (Exception ex)
            {
                Logger.Error("Error has occured in GetInvitations method " + ex.Message);
                throw ex;
            }
        }
        [HttpPost]

    }
}