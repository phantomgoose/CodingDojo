using Microsoft.AspNetCore.Mvc;
using System;

namespace Time_Display.Controllers {
    public class TimeController : Controller {
        
        [HttpGet]
        [Route("")]
        public ViewResult Index() {
            ViewBag.Time = DateTime.Now.ToString("MMMM d, yyy h:m tt");
            return View();
        }
    }
}