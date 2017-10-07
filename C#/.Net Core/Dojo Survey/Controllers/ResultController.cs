using Microsoft.AspNetCore.Mvc;

namespace Dojo_Survey.Controllers {
    public class ResultController : Controller {
        [HttpGet]
        [Route("result")]
        public ViewResult index() {
            return View();
        }
    }
}