using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using DbConnection;

namespace AjaxNotes.Controllers
{
    public class NoteController : Controller
    {

        private DbConnector dblink = new DbConnector();

        // GET: /Home/
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("notes")]
        public IActionResult ListNotes() {
            return Json(dblink.Query("SELECT id, title, description FROM notes"));
        }

        [HttpPost]
        [Route("notes")]
        public IActionResult CreateNote(string title, string description) {
            dblink.Execute($"INSERT INTO notes (title, description) VALUES ('{title}', '{description}')");
            return Json(new {res = "success"});
        }

        [HttpDelete]
        [Route("notes/{id}")]
        public IActionResult DeleteNote(int id) {
            dblink.Execute($"DELETE FROM notes WHERE id={id}");
            return Json(new {res = "success"});
        }
        [HttpPatch]
        [Route("notes/{id}")]
        public IActionResult UpdateNoteDescription(int id, string description) {
            dblink.Execute($"UPDATE notes SET description='{description}' WHERE id={id}");
            return Json(new {res = "success"});
        }
    }
}
