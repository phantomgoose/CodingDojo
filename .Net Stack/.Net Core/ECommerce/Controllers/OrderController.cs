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
            _allCustomers = _context.Customers.OrderBy(c => c.created_at).ToList();
            _allProducts = _context.Products.OrderBy(p => p.created_at).ToList();
        }

        [HttpGet]
        [Route("orders/{search?}")]
        public IActionResult Index(string search) {
            List<Order> orders;
            if (!String.IsNullOrEmpty(search)) {
                orders = _context.Orders
                .Include(o => o.product)
                .Include(o => o.customer)
                .Where(o => o.customer.name.ToUpper().Contains(search.ToUpper())
                || o.product.name.ToUpper().Contains(search.ToUpper()))
                .OrderByDescending(p => p.created_at)
                .ToList();
            } else {
                orders = _context.Orders
                .Include(o => o.product)
                .Include(o => o.customer)
                .OrderByDescending(p => p.created_at)
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
                    quantity = model.quantity,
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow
                };
                _context.Orders.Add(order);
                // update stock
                Product product = _context.Products.Find(model.productid);
                if (product != null) {
                    product.quantity -= model.quantity;
                }
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