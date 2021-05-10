using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SocNetwork.Models
{
    public class SocNetworkContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Repost> Reposts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<ReMessage> ReMessages { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Media> Media { get; set; }
        public DbSet<MessageMedia> MessageMedia { get; set; }
        public DbSet<PostMedia> PostMedia { get; set; }
        public DbSet<ProfileMedia> ProfileMedia { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<UserPost> UserPost { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<PostNotification> PostNotifications { get; set; }
        public DbSet<UserRelationship> UserRelationships { get; set; }

        public SocNetworkContext(DbContextOptions<SocNetworkContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRelationship>()
                 .HasOne(pt => pt.FromUser)
                 .WithMany()
                 .HasForeignKey(pt => pt.FromUserId)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserRelationship>()
                .HasOne(pt => pt.ToUser)
                .WithMany()
                .HasForeignKey(pt => pt.ToUserId);

            modelBuilder.Entity<UserPost>()
                .HasKey(t => new { t.UserId, t.PostId });

            modelBuilder.Entity<UserPost>()
                .HasOne(up => up.User)
                .WithMany(u => u.UserPosts)
                .HasForeignKey(up => up.UserId);

            modelBuilder.Entity<UserPost>()
                .HasOne(up => up.Post)
                .WithMany(p => p.PostUsers)
                .HasForeignKey(up => up.PostId);

            modelBuilder.Entity<Notification>()
             .HasOne(n => n.Sender)
             .WithMany()
             .HasForeignKey(pt => pt.SenderId)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.Recipient)
                .WithMany()
                .HasForeignKey(pt => pt.RecipientId);
        }
    }
}
