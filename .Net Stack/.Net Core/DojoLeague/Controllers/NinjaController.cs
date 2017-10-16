using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DojoLeague.Models;
using DojoLeague.Factories;

namespace DojoLeague.Controllers {
    public class NinjaController : Controller {

        private readonly NinjaFactory _ninjaFactory = new NinjaFactory();
        private readonly DojoFactory _dojoFactory = new DojoFactory();

        [HttpGet]
        [Route("Ninjas")]
        public IActionResult Index() {
            ViewBag.RegisteredNinjas = _ninjaFactory.List();
            ViewBag.RegisteredDojos = _dojoFactory.List();
            ViewBag.NinjaVM = new NinjaVM();
            return View();
        }

        [HttpPost]
        [Route("Ninjas")]
        public IActionResult CreateNinja(NinjaVM model) {
            if (ModelState.IsValid) {
                Ninja ninja = new Ninja {
                    name = model.name,
                    level = model.level,
                    dojo_id = model.dojo_id == 0 ? null : model.dojo_id,
                    description = model.description,
                };
                _ninjaFactory.Create(ninja);
                return RedirectToAction("Index");
            }
            return View("Index");
        }
    }
}