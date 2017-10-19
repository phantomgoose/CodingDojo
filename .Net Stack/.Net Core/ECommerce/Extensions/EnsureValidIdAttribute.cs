using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using ECommerce.Models;

namespace ECommerce.Extensions {
    [AttributeUsage(AttributeTargets.Class)]
    public class EnsureValidIdAttributes : ValidationAttribute {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
            var _dbContext = (ECommerceContext)validationContext.GetService(typeof(ECommerceContext));
            var customers = _dbContext.Customers.ToList();
            var products = _dbContext.Products.ToList();
            var model = value as OrderVM;
            // if for whatever reason type casting fails, return error
            if (model == null) {
                return new ValidationResult("ViewModel is null. Something went horribly wrong.");
            }
            // if product id doesn't match any products in the model or customer id doesn't match any customers in the model, return false
            if (!products.Any(p => p.id == model.productid)) {
                return new ValidationResult("Invalid product ID.");
            }
            if (!customers.Any(c => c.id == model.customerid)) {
                return new ValidationResult("Invalid customer ID.");
            }
            return ValidationResult.Success;
        }
    }
}