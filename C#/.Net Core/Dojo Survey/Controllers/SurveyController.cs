using Microsoft.AspNetCore.Mvc;
using System;

namespace Dojo_Survey.Controllers {
    public class SurveyController : Controller {
        [HttpGet]
        [Route("")]
        public ViewResult index() {
            return View();
        }

        [HttpPost]
        [Route("")]
        public RedirectToActionResult form(string name, string location, string language, string comment = "") {
            TempData["name"] = name;
            TempData["location"] = location;
            TempData["language"] = language;
            TempData["comment"] = comment;
            return RedirectToAction("index", "Result");
        }
    }
}