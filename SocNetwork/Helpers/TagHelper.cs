using Microsoft.EntityFrameworkCore;
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
        private readonly SocNetworkContext db;
        public TagHelper(SocNetworkContext context)
        {
            db = context;
        }
        public async Task<List<Tag>> RecognizeTagsAsync(string text)
        {
            var regex = new Regex(@"#\w+");
            var collection = regex.Matches(text);
            var tags = new List<Tag>();

            if (collection.Count > 0)
            {
                foreach (Match match in collection)
                {
                    var content = match.Value.Substring(1);
                    var tag = await db.Tags
                        .FirstOrDefaultAsync(t => t.Content == content);

                    if (tag == null)
                    {
                        tag = new Tag()
                        {
                            Content = content
                        };
                    }

                    tags.Add(tag);
                }
            }

            return tags;
        }
    }
}
