using System;

namespace DojoLeague.Models
{
    public class Ninja : BaseEntity
    {
        public long id { get; set; }
        public string name { get; set; }
        public int level { get; set; }
        public string description { get; set; }
        public int? dojo_id {get; set;}
        public Dojo dojo { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}