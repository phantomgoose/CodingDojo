using Microsoft.AspNetCore.Mvc;

namespace random_project.Controllers {
    public class MainController : Controller {
        [HttpGet]
        [Route("/string")]
        public string Str() {
            return "this is a string";
        }

        [HttpGet]
        [Route("/int")]
        public int Int() {
            return 1;
        }

        [HttpGet]
        [Route("/json")]
        public JsonResult JsonResponse() {
            return Json(new {object_type = "json"});
        }

        [HttpGet]
        [Route("")]
        public ViewResult Index() {
            return View();
        }
    }
}