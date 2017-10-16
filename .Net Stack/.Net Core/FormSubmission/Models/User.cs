using System.ComponentModel.DataAnnotations;

namespace FormSubmission.Models {
    public class User : BaseEntity {
        [Required]
        [MinLength(4)]
        public string first_name {get; set;}
        [Required]
        [MinLength(4)]
        public string last_name {get; set;}
        [Required]
        [Range(1, int.MaxValue)]
        public int age {get; set;}
        [Required]
        [EmailAddress]
        public string email {get; set;}
        [Required]
        [MinLength(8)]
        public string password {get; set;}

    }
}