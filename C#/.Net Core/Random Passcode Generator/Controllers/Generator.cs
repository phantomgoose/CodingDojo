using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;

namespace Random_Passcode_Generator.Controllers
{
    public class Generator : Controller
    {
        [HttpGet]
        [Route("")]
        public ViewResult index()
        {
            return View();
        }

        [HttpPost]
        [Route("generate")]
        public JsonResult generate()
        {
            int? old_count = HttpContext.Session.GetInt32("gen_count");
            int new_count = old_count == null ? 1 : (int)old_count + 1;
            HttpContext.Session.SetInt32("gen_count", new_count);
            Random r = new Random();
            string passcode = "";
            // ints are 48-57 (incl), letters are 65-90 (incl)
            // concatenating strings isn't the most efficient operation (could have a char array or something instead), but this is only a 14 character long password
            for (int i = 0; i < 14; i++) {
                int next = r.Next(0, 36);
                // if next is between 0 and 9 concat the number to the passcode
                if (next < 10) {
                    passcode += next;
                }
                // otherwise add 55 and convert to a capital case latin character
                else {
                    passcode += (char)(next + 55);
                }
            }
            
            return Json(new { passcode = passcode, gen_count = new_count });
        }
    }
}