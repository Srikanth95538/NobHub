using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NobHubWeb.Models;
using Microsoft.Extensions.Configuration;
using NobHub.BAL.Models;
using NobHub.DAL.Models;

using RestSharp;

namespace NobHubWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        IConfiguration _iconfig;
        IHttpContextAccessor _httpcontextAccessor;
        

        nobhubtestContext _context = new nobhubtestContext();
        SaveCardData _saveData = new SaveCardData();

        public HomeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        
        public async Task<IActionResult> ImageUpload(IFormCollection form)
        {
          if(form.Files.Count>0)
          {
                string webRoot = _hostingEnvironment.WebRootPath;
                if (!System.IO.Directory.Exists(webRoot + "/uploadimgs/"))
                {
                    System.IO.Directory.CreateDirectory(webRoot + "/uploadimgs/");
                }             
                var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/",
                            form.Files[0].FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await form.Files[0].CopyToAsync(stream);
                }
                string imgBase64String = GetBase64StringForImage(path);
              

               // var URL = "https://localhost:44331/api/Card/UploadImageData";
                

                var restClient = new RestClient();
                var request = new RestRequest { };
                request.Method = Method.POST;
                request.AddHeader("Content-Type", "multipart/form-data");
                request.Parameters.Clear();
                request.AlwaysMultipartFormData = true;

                request.Resource = "api/Card/UploadImageData";
                request.AddFile("AudioFileDetail", path, form.Files[0].ContentType);
                var restResponse = await restClient.ExecutePostTaskAsync(request);
                if (restResponse.StatusCode == System.Net.HttpStatusCode.OK)
                {
                }

                    ViewBag.imgsrc = "data:image/png;base64,"+imgBase64String;
            }
            

           
            return View();
        }        
        protected static string GetBase64StringForImage(string imgPath)
        {
            byte[] imageBytes = System.IO.File.ReadAllBytes(imgPath);
            string base64String = Convert.ToBase64String(imageBytes);
            return base64String;
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        
        public async Task<IActionResult> IconUpload(IFormCollection form)
        {
            var _IconName = "";
            if (form.Files.Count > 0)
            {
                foreach (var list in form)
                {
                    if (list.Key.ToString() == "txticonname")
                    {
                        _IconName = list.Value;
                    }                                    
                }
                string webRoot = _hostingEnvironment.WebRootPath;
                if (!System.IO.Directory.Exists(webRoot + "/uploadimgs/icons"))
                {
                    System.IO.Directory.CreateDirectory(webRoot + "/uploadimgs/icons");
                }
                var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot" + "/uploadimgs/icons",
                            form.Files[0].FileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await form.Files[0].CopyToAsync(stream);
                }
                string imgBase64String = GetBase64StringForImage(path);
                ViewBag.imgsrc = "data:image/png;base64," + imgBase64String;

                _saveData.InsertIconData(_IconName, form.Files[0].FileName, form.Files[0].ContentType);

            }
            return View();
        }

      
    }
}
