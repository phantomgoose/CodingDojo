using System.ComponentModel.DataAnnotations;

namespace LoginRegistration.Models
{
    public class RegisterViewModel : BaseEntity
    {
        private const string FirstNameValidationMessage = "First name is required and must be at least two characters long.";
        private const string LastNameValidationMessage = "Last name is required and must be at least two characters long.";
        private const string EmailValidationMessage = "Email address is required and must be valid.";
        private const string PasswordValidationMessage = "Password must be at least 8 characters long.";
        private const string CPasswordValidationMessage = "Password confirmation is required and must match your password.";

        [Required(ErrorMessage = FirstNameValidationMessage)]
        [MinLength(2, ErrorMessage = FirstNameValidationMessage)]
        public string FirstName { get; set; }
        [Required(ErrorMessage = LastNameValidationMessage)]
        [MinLength(2, ErrorMessage = LastNameValidationMessage)]
        public string LastName { get; set; }
        [Required(ErrorMessage = EmailValidationMessage)]
        [EmailAddress(ErrorMessage = EmailValidationMessage)]
        public string Email { get; set; }
        [Required(ErrorMessage = PasswordValidationMessage)]
        [MinLength(8, ErrorMessage = PasswordValidationMessage)]
        public string Password { get; set; }
        [Required(ErrorMessage = CPasswordValidationMessage)]
        [Compare("Password", ErrorMessage = CPasswordValidationMessage)]
        public string PasswordConfirmation { get; set; }
    }
}