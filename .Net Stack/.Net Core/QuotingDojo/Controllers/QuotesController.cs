using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using DbConnection;

namespace QuotingDojo.Controllers
{
    public class QuotesController : Controller
    {
        public DbConnector dblink = new DbConnector();

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("quotes")]
        public IActionResult ListQuotes() {
            ViewBag.Quotes = dblink.Query("SELECT * FROM quotes ORDER BY created_at DESC");
            return View("List");
        }

        [HttpPost]
        [Route("quotes")]
        public IActionResult NewQuote(string name, string quote) {
            dblink.Execute($"INSERT INTO quotes (name, quote) VALUES ('{name}', '{quote}')");
            return RedirectToAction("ListQuotes");
        }
    }
}
