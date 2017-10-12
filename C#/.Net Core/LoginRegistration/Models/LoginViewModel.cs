using System.ComponentModel.DataAnnotations;

namespace LoginRegistration.Models
{
    public class LoginViewModel : BaseEntity
    {
        private const string EmailValidationMessage = "Email address is required and must be valid.";
        public string LastName { get; set; }
        [Required(ErrorMessage = EmailValidationMessage)]
        [EmailAddress(ErrorMessage = EmailValidationMessage)]
        public string LoginEmail { get; set; }
        public string LoginPassword { get; set; }
    }
}