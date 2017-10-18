namespace ECommerce.Models
{
    public class Product : BaseEntity {
        public string name {get; set;}
        public string img_url {get; set;}
        public string description {get; set;}
        public int quantity {get; set;}
    }
}