using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Pagination
{
    public class PostsPageParams
    {
        const int maxSize = 50;
        private int _size = 15;
        public int Number { get; set; } = 1;
        public int Size
        {
            get
            {
                return _size;
            }
            set
            {
                _size = (value > maxSize) ? maxSize : value;
            }
        }
    }
}
