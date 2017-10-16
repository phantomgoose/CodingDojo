using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using FormSubmission.Models;
using System.Linq;

namespace FormSubmission.Controllers
{
    public class UserController : Controller
    {
        // GET: /Home/
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("")]
        public IActionResult RegisterUser(string first_name, string last_name, int age, string email, string password) {
            User user = new User();
            user.first_name = first_name;
            user.last_name = last_name;
            user.age = age;
            user.email = email;
            user.password = password;
            TryValidateModel(user);
            if (ModelState.ErrorCount > 0) {
                ViewBag.ValidationErrors = ModelState.Values;
                ViewBag.Valid = false;
                return View("Index");
            }
            return View("Success");
        }
    }
}
