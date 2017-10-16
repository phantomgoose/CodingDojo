using Microsoft.AspNetCore.Mvc;
using DojoLeague.Factories;
using DojoLeague.Models;

namespace DojoLeague.Controllers {
    public class DojoController : Controller { 

        private readonly DojoFactory _dojoFactory = new DojoFactory();

        [HttpGet]
        [Route("Dojos")]
        public IActionResult Index() {
            ViewBag.RegisteredDojos = _dojoFactory.List();
            ViewBag.DojoVM = new DojoVM();
            return View();
        }

        [HttpPost]
        [Route("Dojos")]
        public IActionResult CreateDojo(DojoVM model) {
            if (ModelState.IsValid) {
                Dojo dojo = new Dojo {
                    name = model.name,
                    location = model.location,
                    information = model.information,
                };
                _dojoFactory.Create(dojo);
                return RedirectToAction("Index");
            }
            return View("Index");
        }

        [HttpGet]
        [Route("Dojos/{id}")]
        public IActionResult ShowDojo(int id) {
            Dojo dojo = _dojoFactory.GetDojo(id);
            return View("Show", dojo);
        }
    }
}