using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using LoginRegistration.Models;
using DbConnection;
using BCrypt.Net;

namespace LoginRegistration.Controllers
{
    public class UserController : Controller
    {
        private readonly DBConnector _db;
        public UserController(DBConnector db)
        {
            _db = db;
        }
        // GET: /Home/
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            ViewBag.RegisterViewModel = new RegisterViewModel();
            return View();
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                // check if email is already in db
                var query = _db.Query($"SELECT * FROM users WHERE email='{model.Email}'");
                if (query.Count > 0)
                {
                    ModelState.AddModelError("Email", "Looks like a user with this email already exists.");
                    return View("Index");
                }
                User user = new User
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                };
                _db.Execute($"INSERT INTO users (first_name, last_name, email, password) VALUES ('{user.FirstName}','{user.LastName}','{user.Email}','{user.Password}')");
                return Json("success");
            }
            return View("Index");
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _db.Query($"SELECT * FROM users WHERE email='{model.LoginEmail}'");
                if (user.Count > 0)
                {
                    string hashedPW = "";
                    if (user[0].ContainsKey("password")) {
                        hashedPW = (string)user[0]["password"];
                    }
                    if (BCrypt.Net.BCrypt.Verify(model.LoginPassword, hashedPW))
                    {
                        return Json("success");
                    }
                }
            }
            ModelState.AddModelError("LoginEmail", "Invalid password or email");
            return View("Index");
        }
    }
}
