using DojoLeague.Models;
using System.Collections.Generic;

namespace DojoLeague.Factories
{
    public interface IFactory<T> where T : BaseEntity { }
}