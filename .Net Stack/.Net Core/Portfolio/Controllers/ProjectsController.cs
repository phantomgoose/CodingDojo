using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Controllers {
    public class ProjectsController : Controller {
        [HttpGet]
        [Route("projects")]
        public ViewResult index() {
            return View();
        }
    }
}