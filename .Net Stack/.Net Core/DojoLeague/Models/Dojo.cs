using System;
using System.Collections.Generic;

namespace DojoLeague.Models
{
    public class Dojo : BaseEntity
    {
        public long id { get; set; }
        public string name { get; set; }
        public string location { get; set; }
        public string information { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public ICollection<Ninja> ninjas {get; set;}
    }
}