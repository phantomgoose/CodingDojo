using System;
using ECommerce.Models;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Extensions {
    [AttributeUsage(AttributeTargets.Class)]
    public class EnsureValidQuantityAttribute : ValidationAttribute {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
            var _dbContext = (ECommerceContext)validationContext.GetService(typeof(ECommerceContext));
            var model = value as OrderVM;
            if (model == null) {
                return new ValidationResult("ViewModel is null. Something went horribly wrong.");
            }
            if (model.quantity <= 0) {
                return new ValidationResult("Quantity must be a positive integer.");
            }
            var product = _dbContext.Products.Find(model.productid);
            if (product == null) {
                return new ValidationResult("Unable to retrieve product with the specified ID.");
            }
            if (product.quantity < model.quantity) {
                return new ValidationResult($"Ordered too many {product.name}(s)! In stock: {product.quantity}. You tried to order: {model.quantity}.");
            }
            return ValidationResult.Success;
        }
    }
}