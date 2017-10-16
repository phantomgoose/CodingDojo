using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace DojoLeague.Models {
    public class NinjaVM : BaseEntity {

        private const string NameError = "Name must be at least two characters long";

        [Required(ErrorMessage = NameError)]
        [MinLength(2, ErrorMessage = NameError)]
        public string name {get; set;}

        // no custom error message, since front end won't allow regular users to select anything outside of range
        [Required]
        [Range(1, 10)]
        public int level {get; set;}

        [Required]
        public int? dojo_id {get; set;}

        // optional
        public string description {get; set;}
    }
}