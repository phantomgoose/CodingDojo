using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Calling_Card.Controllers
{
    public class CardController : Controller
    {
        [HttpGet]
        [Route("")]
        public string Index()
        {
            return "HI";
        }

        [HttpGet]
        [Route("{first_name}/{last_name}/{age}/{fav_color}")]
        public JsonResult WutFace(string first_name, string last_name, int age, string fav_color)
        {
            return Json(new
            {
                first_name = first_name,
                last_name = last_name,
                age = age,
                fav_color = fav_color
            });
        }
    }
}