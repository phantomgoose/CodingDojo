using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using ECommerce.Models;

namespace ECommerce.Controllers {
    public class OrderController : Controller {

        private List<Customer> _allCustomers;
        private List<Product> _allProducts;
        
        private readonly ECommerceContext _context;

        public OrderController(ECommerceContext context) {
            _context = context;
            _allCustomers = _context.Customers.ToList();
            _allProducts = _context.Products.ToList();
        }

        [HttpGet]
        [Route("orders/{search?}")]
        public IActionResult Index(string search) {
            List<Order> orders;
            if (!String.IsNullOrEmpty(search)) {
                orders = _context.Orders
                .Include(o => o.product)
                .Include(o => o.customer)
                .Where(o => o.customer.name.Contains(search)
                || o.product.name.Contains(search)
                || o.quantity.ToString().Contains(search))
                .ToList();
            } else {
                orders = _context.Orders
                .Include(o => o.product)
                .Include(o => o.customer)
                .ToList();
            }
            ViewBag.OrderVM = new OrderVM {
                products = _allProducts,
                customers = _allCustomers
            };
            return View(orders);
        }

        [HttpPost]
        [Route("orders")]
        public IActionResult CreateOrder(OrderVM model) {
            // so many unnecessary db calls...
            if (ModelState.IsValid) {
                Order order = new Order {
                    customerid = model.customerid,
                    productid = model.productid,
                    // add "out of stock" check for quantity
                    quantity = model.quantity,
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow
                };
                _context.Orders.Add(order);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.OrderVM = new OrderVM {
                products = _allProducts,
                customers = _allCustomers
            };
            return View("Index", _context.Orders.ToList());
        }
    }
}