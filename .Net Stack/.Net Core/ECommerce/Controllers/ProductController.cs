using Microsoft.AspNetCore.Mvc;
using ECommerce.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

namespace ECommerce.Controllers
{
    public class ProductController : Controller
    {
        private readonly ECommerceContext _context;
        private List<Product> _top15Products;
        private bool _enableShowMore = false;

        public ProductController(ECommerceContext context) {
            _context = context;
            refreshTop15();
        }

        [HttpGet]
        [Route("products")]
        public IActionResult Index()
        {
            ViewBag.ProductVM = new ProductVM();
            ViewBag.EnableShowMore = _enableShowMore;
            return View(_top15Products);
        }

        [HttpPost]
        [Route("products")]
        public IActionResult CreateProduct(ProductVM model) {
            if (ModelState.IsValid) {
                Product product = new Product {
                    name = model.name,
                    description = model.description,
                    img_url = model.img_url,
                    quantity = model.quantity,
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow,
                };
                _context.Add(product);
                _context.SaveChanges();
                refreshTop15();
                return RedirectToAction("Index");
            }
            return View("Index", _top15Products);
        }

        [HttpGet]
        [Route("products/all")]
        public IActionResult ShowAll() {
            return View("Index", _context.Products.OrderByDescending(product => product.created_at).ToList());
        }

        private void refreshTop15() {
            _top15Products = _context.Products.OrderByDescending(product => product.created_at).Take(15).ToList();
            if (_top15Products.Count == 15) {
                _enableShowMore = true;
            }
        }
    }
}