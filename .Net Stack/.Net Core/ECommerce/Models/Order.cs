namespace ECommerce.Models {
    public class Order : BaseEntity {
        public int productid {get; set;}
        public Product product {get; set;}
        public int customerid {get; set;}
        public Customer customer {get; set;}
        public int quantity {get; set;}
    }
}