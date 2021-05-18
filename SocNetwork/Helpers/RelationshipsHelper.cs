using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SocNetwork.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace SocNetwork.Helpers
{
    public class RelationshipsHelper
    {
        private readonly SocNetworkContext db;

        public RelationshipsHelper(SocNetworkContext context) {
            db = context;
        }       
        
        public UserRelationship GetOrDefault(User fromUser, User toUser) {

            var ur = db.UserRelationships
                .FirstOrDefault(
                    ur => ur.FromUserId == fromUser.Id && ur.ToUserId == toUser.Id
                );
            
            return ur ?? new UserRelationship() { 
                FromUser = fromUser,
                ToUser = toUser,
                UserRelationshipType = UserRelationshipType.UnFollowed
            };
        }

        public UserRelationship CreateOrExist(User fromUser, User toUser) {

            var ur = db.UserRelationships
                .FirstOrDefault(
                    ur => ur.FromUserId == fromUser.Id && ur.ToUserId == toUser.Id
                );
            
            if (ur == null) {
                ur = new() {
                    FromUserId = fromUser.Id,
                    ToUserId = toUser.Id,
                    CreationDate = DateTime.Now
                };

                db.UserRelationships.Add(ur);
                db.SaveChanges();
            }

            return ur;
        }

        public void Update(UserRelationship ur, UserRelationshipType urType) {

            ur.UserRelationshipType = urType;
            ur.CreationDate = DateTime.Now;

            db.SaveChanges();
        }

        public void Remove(UserRelationship ur) {
            db.UserRelationships.Remove(ur);

            db.SaveChanges();
        } 
    }
}
