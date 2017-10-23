using Microsoft.AspNetCore.Mvc;
using ECommerce.Models;

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
