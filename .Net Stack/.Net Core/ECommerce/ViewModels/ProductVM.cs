using System.ComponentModel.DataAnnotations;

namespace ECommerce.Models {
    public class ProductVM {
        
        private const string nameError = "Product name must be at least 2 characters long.";
        private const string urlError = "Please enter a valid image url (must have valid image extension)";
        private const string descriptionError = "Description must be at least 2 characters long.";
        private const string quantityError = "Quantity cannot be less than 1.";

        [Required(ErrorMessage = nameError)]
        [MinLength(2, ErrorMessage = nameError)]
        public string name {get; set;}

        [Required(ErrorMessage = urlError)]
        [RegularExpression(@"^https{0,1}:\/\/.+\.(?i)(jpeg|jpg|png|gif)$", ErrorMessage = urlError)]
        public string img_url {get; set;}

        [Required(ErrorMessage = descriptionError)]
        [MinLength(2, ErrorMessage = descriptionError)]
        public string description {get; set;}

        [Required(ErrorMessage = quantityError)]
        [Range(1,int.MaxValue, ErrorMessage = quantityError)]
        public int quantity {get; set;}
    }
}