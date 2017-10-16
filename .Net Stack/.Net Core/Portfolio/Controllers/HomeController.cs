using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Controllers {
    public class HomeController : Controller {
        [HttpGet]
        [Route("")]
        public ViewResult index() {
            return View();
        }
    }
}