using System;

namespace ECommerce.Models
{
    public abstract class BaseEntity {
        public int id {get; set;}
        public DateTime created_at {get; set;}
        public DateTime updated_at {get; set;}
    }
}