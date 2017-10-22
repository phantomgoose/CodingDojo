using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ECommerce.Models;
using Microsoft.EntityFrameworkCore;

// ViewComponent and async practice
namespace ECommerce.ViewComponents {
    public class RecentEventsViewComponent : ViewComponent {
        private readonly ECommerceContext _context;

        public RecentEventsViewComponent(ECommerceContext context) {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync(string search) {
            // determines whether the filter should be skipped
            bool skipFilter = String.IsNullOrEmpty(search);
            if (!skipFilter) {
                // convert search param to uppercase
                search = search.ToUpper();
            }

            // get top 3-5 products/orders/customers (by created_at desc). Filter using search string if it's not empty 
            var asyncProducts = _context.Products
            .Where(p => skipFilter ? true : p.name.ToUpper().Contains(search))
            .OrderByDescending(p => p.created_at).Take(5).ToListAsync();

            var asyncOrders = _context.Orders.Include(o => o.product).Include(o => o.customer)
            .Where(o => skipFilter ? true : o.product.name.ToUpper().Contains(search)
            || o.customer.name.ToUpper().Contains(search))
            .OrderByDescending(o => o.created_at).Take(3).ToListAsync();

            var asyncCustomers = _context.Customers
            .Where(c => skipFilter ? true : c.name.ToUpper().Contains(search))
            .OrderByDescending(c => c.created_at).Take(3).ToListAsync();

            var res = new RecentEventsViewModel {
                recentProducts = await asyncProducts,
                recentOrders = await asyncOrders,
                newCustomers = await asyncCustomers,
            };
            return View(res);
        }
    }

    public class RecentEventsViewModel {
        public List<Product> recentProducts {get; set;}
        public List<Order> recentOrders {get; set;}
        public List<Customer> newCustomers {get; set;}
        public DateTime now {get; set;} = DateTime.UtcNow;

        public string DateDiff(DateTime time) {
            TimeSpan diff = this.now - time;
            if (diff.TotalDays > 365) {
                return "more than a year";
            } else if (diff.TotalDays > 7) {
                return $"{(int)Math.Floor(diff.TotalDays / 7.0)} week(s)";
            } else if (diff.TotalHours > 24) {
                return $"{(int)Math.Floor(diff.TotalHours / 24.0)} day(s)";
            } else if (diff.TotalMinutes > 60) {
                return $"{(int)Math.Floor(diff.TotalMinutes / 60.0)} hour(s)";
            } else {
                return $"{(int)Math.Floor(diff.TotalMinutes)} minute(s)";
            }
        }
    }
}