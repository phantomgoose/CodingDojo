using Microsoft.AspNetCore.Mvc;
using ECommerce.Models;
using System.Collections.Generic;
using System.Linq;

namespace ECommerce.Controllers
{
    public class HomeController : Controller
    {
        private readonly ECommerceContext _context;

        public HomeController(ECommerceContext context) {
            _context = context;
        }

        // GET: /Home/
        [HttpGet]
        [Route("{search?}")]
        public IActionResult Index(string search)
        {   
            ViewBag.search = search;
            return View();
        }
    }
}
