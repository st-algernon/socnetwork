using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public class TagHelper
    {
        public static List<Tag> FindTags(string text)
        {
            var regex = new Regex(@"#\w+");
            var collection = regex.Matches(text);
            var tags = new List<Tag>();

            if (collection.Count > 0)
            {
                foreach (Match match in collection)
                {
                    tags.Add(new Tag()
                    {
                        Content = match.Value.Substring(1)
                    }) ;
                }
            }

            return tags;
        }
    }
}
