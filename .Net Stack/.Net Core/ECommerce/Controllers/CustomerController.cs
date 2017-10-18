using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ECommerce.Models;

namespace ECommerce.Controllers
{
    public class CustomerController : Controller
    {

        private readonly ECommerceContext _context;

        public CustomerController(ECommerceContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("customers/{search?}")]
        public IActionResult Index(string search)
        {
            List<Customer> customers;
            if (!String.IsNullOrEmpty(search)) {
                customers = _context.Customers.Where(c => c.name.Contains(search)).ToList();
            } else {
                customers = _context.Customers.ToList();
            }
            ViewBag.CustomerVM = new CustomerVM();
            return View(customers);
        }

        [HttpPost]
        [Route("customers")]
        public IActionResult CreateCustomer(CustomerVM model)
        {
            if (ModelState.IsValid)
            {
                // see if user with this name already exists
                Customer customer = _context.Customers.SingleOrDefault(c => c.name == model.name);
                if (customer == null)
                {
                    customer = new Customer
                    {
                        name = model.name,
                        created_at = DateTime.UtcNow,
                        updated_at = DateTime.UtcNow
                    };
                    _context.Customers.Add(customer);
                    _context.SaveChanges();
                    return RedirectToAction("Index");
                }
                ModelState.AddModelError("name", "A user with this name already exists!");
            }
            return View("Index", _context.Customers.ToList());
        }

        [HttpGet]
        [Route("customers/{id}/delete")]
        public IActionResult DeleteCustomer(int id)
        {
            Customer customer = _context.Customers.SingleOrDefault(c => c.id == id);
            _context.Customers.Remove(customer);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}