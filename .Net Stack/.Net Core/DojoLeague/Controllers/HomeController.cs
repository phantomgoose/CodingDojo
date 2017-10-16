using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace DojoLeague.Controllers
{
    public class HomeController : Controller
    {
        // GET: /Home/
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return RedirectToAction("Index", "Ninja");
        }

        public IActionResult PageNotFound() {

            return Json("page not found");
        }
    }
}
