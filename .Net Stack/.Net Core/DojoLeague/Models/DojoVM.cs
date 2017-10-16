using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DojoLeague.Models
{
    public class DojoVM : BaseEntity
    {
        public string name { get; set; }
        public string location { get; set; }
        public string information { get; set; }
    }
}