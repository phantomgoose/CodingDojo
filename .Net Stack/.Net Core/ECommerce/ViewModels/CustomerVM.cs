using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models {
    public class CustomerVM {
        private const string nameError = "Product name must be at least 2 characters long.";

        [Required(ErrorMessage = nameError)]
        [MinLength(2, ErrorMessage = nameError)]
        public string name {get; set;}
    }
}