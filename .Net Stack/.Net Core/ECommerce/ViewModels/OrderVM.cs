using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ECommerce.Extensions;

namespace ECommerce.Models {
    [EnsureValidIdAttributes] // or something went horribly wrong somewhere
    public class OrderVM {

        // only validation we can run client side really.
        private const string idQuantityError = "Value must be greater than 0.";

        [Required(ErrorMessage = idQuantityError)]
        [Range(1, int.MaxValue, ErrorMessage = idQuantityError)]
        public int productid {get; set;}
        
        [Required(ErrorMessage = idQuantityError)]
        [Range(1, int.MaxValue, ErrorMessage = idQuantityError)]
        public int customerid {get; set;}
        
        [Required(ErrorMessage = idQuantityError)]
        [Range(1, int.MaxValue, ErrorMessage = idQuantityError)]
        public int quantity {get; set;}

        public List<Customer> customers {get; set;}

        public List<Product> products {get; set;}
    }
}