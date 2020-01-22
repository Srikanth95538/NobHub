using System;
using System.Diagnostics;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using NobHub.BAL.Models;
using NobHub.DAL.Models;



namespace NobHubWeb.Controllers
{
    public class BusinessCardsController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        nobhubtestContext _context = new nobhubtestContext();
        SaveCardData _saveData = new SaveCardData();

        public BusinessCardsController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        // GET: Cards
        public ActionResult Index()
        {
            ViewBag.Name = "Upload a new card";
            return View();
        }

        // GET: Cards/Create
        public ActionResult Create()
        {
            var model = new List<BusinessCard>();
            model = _saveData.GetDefaultCards();

            return View("CreateCard", model);
        }

        public ActionResult CreateCard(int basecard = 0,bool PickORCloneImg=false)
        {
            var model = new BusinessCard();

            if (basecard == 0)
            {
                model.Cardname = "New Business Card";
                model.Cardshape = 1;
                model.Cardfrontfile = "";
                model.Cardbackfile = "";
                model.Category = 0;
            }
            else
            {
                model = _saveData.GetActiveCarddetaillsById(basecard);
                model.CardId = 0;
                model.PickORCloneImg = PickORCloneImg;
                model.Ispublished = false;
                foreach (var ele in model.Elements)
                {
                    ele.Id = 0;
                }
            }

            ViewBag.AllElements = _saveData.GetCardElementGroups();
            ViewBag.AllIcons = _saveData.GetIconNames();
            ViewBag.AllCategories = _saveData.GetAllCategories();

            return View("EditCard", model);
        }

        public ActionResult CreateCardTemplate()
        {
            var model = new BusinessCard();

            model.Cardname = "New Card Template";
            model.Cardshape = 1;
            model.Cardfrontfile = "";
            model.Cardbackfile = "";
            model.IsDefault = true;
            model.Category = 0;

            ViewBag.AllElements = _saveData.GetCardElementGroups();
            ViewBag.AllIcons = _saveData.GetIconNames();
            ViewBag.AllCategories = _saveData.GetAllCategories();

            return View("EditCard", model);
        }

        [HttpGet]
        public ActionResult PublishedCards()
        {
            var model = new List<BusinessCard>();
            model = _saveData.GetPublishedCards();           
            ViewBag.AllCategories = _saveData.GetAllCategories();
            ViewBag.Title2 = " - Published Cards";
            return View(model);
        }

        public ActionResult CardTemplates()
        {
            var model = new List<BusinessCard>();
            model = _saveData.GetDefaultCards();
            ViewBag.AllCategories = _saveData.GetAllCategories();
            ViewBag.Title2 = " - Card Templates";
            ViewBag.IsTemplate = true;

            return View("PublishedCards", model);
        }

        public ActionResult PendingCards()
        {
            var model = new List<BusinessCard>();
            model = _saveData.GetPendingCards();
            ViewBag.AllCategories = _saveData.GetAllCategories();
            ViewBag.Title2 = " - Pending Cards";
            return View("PublishedCards", model);
        }

        public ActionResult EditCard(int cardId,bool PickORCloneImg)
        {
            ViewBag.Name = "Upload a new card";

            var model = _saveData.GetActiveCarddetaillsById(cardId);
            model.PickORCloneImg = PickORCloneImg;
            if (model == null)
                return View("_ErrView", "Invalid Card ID" + cardId);

            if(model.IsDefault)
                ViewBag.Title2 = " - Edit Card Template";
            else if(!model.Ispublished)
                ViewBag.Title2 = " - Edit Card (Not Published Yet)";
            else
                ViewBag.Title2 = " - Edit Card";

            ViewBag.AllElements = _saveData.GetCardElementGroups();
            ViewBag.AllIcons = _saveData.GetIconNames();
            ViewBag.AllCategories = _saveData.GetAllCategories();
            return View("EditCard", model);
        }
        public ActionResult CloneCard(int CardId, string ComingFrom,bool PickORCloneImg)
        {
            var model = new BusinessCard();


          if(ComingFrom == "defaultCards")
            {
                model = _saveData.GetActiveCarddetaillsById(CardId);
                model.CardId = 0;
                model.Ispublished = false;
                model.IsDefault = true;
                model.PickORCloneImg = PickORCloneImg;
                foreach (var ele in model.Elements)
                {
                    ele.Id = 0;
                }
            }
            else
            {
                model = _saveData.GetActiveCarddetaillsById(CardId);
                model.CardId = 0;
                model.Ispublished = false;
                model.PickORCloneImg = PickORCloneImg;
                foreach (var ele in model.Elements)
                {
                    ele.Id = 0;
                }
            }

            ViewBag.AllElements = _saveData.GetCardElementGroups();
            ViewBag.AllIcons = _saveData.GetIconNames();
            ViewBag.AllCategories = _saveData.GetAllCategories();

            return View("EditCard", model);
        }
        public ActionResult CardsPreview(int CardId)
        {

            var model = new UsercardDetailelements();
            model = _saveData.GetDummyuserdetails(CardId);
            return View(model);

        }
        public ActionResult home()
        {
            var model = new List<BusinessCard>();
            ViewBag.Title2 = " - Dashboard";
            return View(model);
        }

        // GET: Cards/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // POST: Cards/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Cards/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Cards/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Cards/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Cards/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        public async Task<IActionResult> ImageUpload(IFormCollection form)
        {
            var _card = new CardsLookup();
            _card.Cardname = "card";
            _card.Cardnameback = "card-1";
            _card.Cardfrontfile = "";
            _card.Cardbackfile = "";
            var _width = "";
            var _height = "";
            var _radious = "";
            foreach (var list in form)
            {
                if (list.Key.ToString() == "txtcardWidth")
                {
                    _width = list.Value;
                }
                if (list.Key.ToString() == "txtcardHeight")
                {
                    _height = list.Value;
                }
                if (list.Key.ToString() == "txtcardborderradious")
                {
                    _radious = list.Value;
                }

            }
            //if (_width == "") _width = "325";
            //if (_height == "") _height = "100%";
            if (_radious == "") _radious = "0";




            var _cardid = _saveData.insertCard(Convert.ToInt32(_width), Convert.ToInt32(_height), Convert.ToInt32(_radious));

            if (_cardid != 0)
            {

                _card.CardId = _cardid;
            }
            else
            {

                //show error saving.
            }




            if (form.Files.Count > 0)
            {
                string webRoot = _hostingEnvironment.WebRootPath;
                //string webRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/cards/");
                if (!System.IO.Directory.Exists(webRoot + "/uploadimgs/"))
                {
                    System.IO.Directory.CreateDirectory(webRoot + "/uploadimgs/");
                }
                if (!System.IO.Directory.Exists(webRoot + "/uploadimgs/cards/"))
                {
                    System.IO.Directory.CreateDirectory(webRoot + "/uploadimgs/cards/");
                }
                var aa = Directory.GetCurrentDirectory();
                if (!System.IO.Directory.Exists(Path.Combine(aa, "wwwroot" +
                             "/uploadimgs/cards/")))
                {
                    System.IO.Directory.CreateDirectory(Path.Combine(aa, "wwwroot" +
                             "/uploadimgs/cards/"));
                }


                foreach (var _myfile in form.Files)
                {

                    if (_myfile.Name == "user_image_front")
                    {
                        _card.Cardname = "Card" + _cardid.ToString();
                        _card.Cardfrontfile = "Card" + _cardid.ToString() + form.Files[0].FileName.Substring(form.Files[0].FileName.LastIndexOf("."));

                        var path = Path.Combine(aa, "wwwroot" + "/uploadimgs/cards/", _card.Cardfrontfile);

                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            await form.Files[0].CopyToAsync(stream);
                        }
                    }
                    else if (_myfile.Name == "user_image_back")
                    {
                        _card.Cardnameback = "Card" + _cardid.ToString() + "-1";
                        _card.Cardbackfile = "Card" + _cardid.ToString() + "-1" + form.Files[0].FileName.Substring(form.Files[0].FileName.LastIndexOf("."));

                        var path = Path.Combine(aa, "wwwroot" + "/uploadimgs/cards/", _card.Cardbackfile);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            await form.Files[0].CopyToAsync(stream);
                        }
                    }
                }


                var x = _saveData.UpdateCarddetailsAfterInsert(_card);

                if (x == true)
                {
                    ViewBag.Status = "Card data saved Successfully";
                }
                else
                {
                    ViewBag.Status = "Error saving Card data";

                }

            }




            return View("Index");

        }
        protected static string GetBase64StringForImage(string imgPath)
        {
            byte[] imageBytes = System.IO.File.ReadAllBytes(imgPath);
            string base64String = Convert.ToBase64String(imageBytes);
            return base64String;
        }

        public List<CardsLookup> GetActiveCards()
        {
            List<CardsLookup> _details = new List<CardsLookup>();
            try
            {
                _details = (from e in _context.CardsLookup select e).ToList();
                return _details;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IActionResult CardsFiltering([FromForm] BusinessCard Businesscard)
        {
            var FilteredData = new List<BusinessCard>();
            FilteredData = _saveData.CardsFiltering(Businesscard.Category, Businesscard.Cardname,Businesscard.IscameFrom);
            ViewBag.AllCategories = _saveData.GetAllCategories();
            return PartialView("_CardsList", FilteredData);

        }

        public ActionResult PublisheCardById(int cardId,string ComingFrom)
        {
            List<BusinessCard> model = new List<BusinessCard>();
            var PublishedCard = _saveData.PublisheCardById(cardId);
            if (ComingFrom == "defaultCards")
            {
                return RedirectToAction("CardTemplates");
            }
            else 
            {
               // model = _saveData.GetPendingCards();
               return RedirectToAction("PendingCards");

            }
            
        }

        public IActionResult DeleteCardById(int CardId,string ComingFrom)
        {
            List<BusinessCard> model =new List<BusinessCard>();
            var Deletecard = _saveData.DeleteCardById(CardId);
            if (ComingFrom == "PublishedCards")
            {
                return RedirectToAction("PublishedCards");
            }
            else if(ComingFrom == "PendingCards")
            {
                return RedirectToAction("PendingCards");

            }
            else 
            {
                return RedirectToAction("CardTemplates");
            }           

        }

        public ActionResult RegisteredUsers()
        {
            var model = new List<RegisteredUsers>();
             model = _saveData.GetRegisteredUsers();
            ViewBag.Title2 = " - Registered Users";
            return View(model);
        }

        public ActionResult UsersFiltering([FromForm] RegisteredUsers users)
        {
            var model = new List<RegisteredUsers>();
            model = _saveData.UsersFiltering(users.NameORMobilOREmail);
            return PartialView("_UsersList", model);
        }

        public ActionResult UserCardPreview(int Guid)
        {
            var model = new UsercardDetailelements();
            ViewBag.AllCategories = _saveData.GetAllBusinessCards();
            model = _saveData.GetUserDefaultCardById1(Guid);
            return View(model);
        }

        public IActionResult LookUps()
        {
            var _listofcategories = _saveData.GetAllCategories();
            return View(_listofcategories);
        }
        public IActionResult GetCardCategories()
        {             
                var _listofcategories = _saveData.GetAllCategories();
            return PartialView("_categoryList", _listofcategories);
            
        }
        public IActionResult GetProfessions()
        {

            var _listofproffesions = _saveData.GetAllProfessions();
            return PartialView("_proffesionsList", _listofproffesions);

        }
        public IActionResult GetAllIcons()
        {

            var _listoficons = _saveData.GetAllIcons();
            return PartialView("_iconsList", _listoficons);

        }

        public async Task<ActionResult> createORUpdate([FromForm]IFormCollection form,[FromForm] CardCategories icons)
        {

            var data = _saveData.createORUpdateCategory(icons.categorieID, icons.categorieName,icons.categoryFileName);
            foreach (var file in form.Files)
            {
                string[] files = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/categoryIcons/"));
                foreach (string imgfile in files)
                {
                    var FileName = Path.GetFileNameWithoutExtension(imgfile);
                    var fileId = FileName.Split("_");
                    if (fileId[0] == icons.categorieID.ToString())
                    {
                        System.IO.File.Delete(imgfile);
                    }
                }
                var iconfile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/categoryIcons/", data + "_" + file.FileName);
                using (var stream = new FileStream(iconfile, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
               
            }
            var _listofcategories = _saveData.GetAllCategories();
            return PartialView("_categoryList", _listofcategories);


        }

        public IActionResult createORUpdateProffesion([FromForm] Professions icons)
        {

            var data = _saveData.createORUpdateProffesion(icons.Id, icons.Name);
            var _listofproffesions = _saveData.GetAllProfessions();
            return PartialView("_proffesionsList", _listofproffesions);

        }

        public async Task<ActionResult> createORUpdateIcon([FromForm]IFormCollection form, [FromForm] cardicons icons)
        {

            var data = _saveData.createORUpdateIcon(icons.iconId, icons.iconName,icons.iconFileName);
            foreach (var file in form.Files)
            {
                string[] files = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/icons/"));
                foreach (string imgfile in files)
                {
                    var FileName = Path.GetFileNameWithoutExtension(imgfile);
                    var fileId = FileName.Split("_");
                    if (fileId[0] == icons.iconId.ToString())
                    {
                        System.IO.File.Delete(imgfile);
                    }
                }
                var iconfile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/icons/", data + "_" + file.FileName);
                using (var stream = new FileStream(iconfile, FileMode.Create))
                {
                  await  file.CopyToAsync(stream);
                }
            }
            var _listoficons = _saveData.GetAllIcons();
            
           return PartialView("_iconsList", _listoficons);


        }

        public IActionResult DeleteCategory([FromForm] CardCategories icons)
        {

            var data = _saveData.DeleteCategory(icons.categorieID);
            //deleting image into local folder
            string[] files = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/categoryIcons/"));
            
            foreach (string file in files)
            {
                var FileName = Path.GetFileNameWithoutExtension(file);
                var fileId = FileName.Split("_");
                if (fileId[0] == icons.categorieID.ToString())
                {
                    System.IO.File.Delete(file);
                }
            }
            var _listofcategories = _saveData.GetAllCategories();
            return PartialView("_categoryList", _listofcategories);

        }

        public IActionResult DeleteProffesion([FromForm] Professions icons)
        {

            var data = _saveData.DeleteProffesion(icons.Id);
            var _listofproffesions = _saveData.GetAllProfessions();
            return PartialView("_proffesionsList", _listofproffesions);

        }
       
        public IActionResult DeleteIcon([FromForm] cardicons icons)
        {

            var data = _saveData.DeleteIcon(icons.iconId);
            //deleting image into local folder
            string[] files = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/icons/"));
            foreach (string file in files)
            {
                var FileName = Path.GetFileNameWithoutExtension(file);
                var fileId = FileName.Split("_");
                if (fileId[0] == icons.iconId.ToString())
                {
                    System.IO.File.Delete(file);
                }
            }
            var _listoficons = _saveData.GetAllIcons();
            return PartialView("_iconsList", _listoficons);

        }

        public IActionResult SubmitDummydetails([FromForm]IFormCollection form,[FromForm] RegisteredUsers dummyuser)
        {
            var model = new UsercardDetailelements();
            var savedummyuserdata = _saveData.saveDummyuserdetails(dummyuser);
            // return RedirectToAction("CardsPreview(dummyuser.Guid)");
            model = _saveData.GetDummyuserdetails(dummyuser.Guid);
            return View("CardsPreview", model);
        }


    }
}