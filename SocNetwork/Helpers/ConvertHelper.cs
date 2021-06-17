using SocNetwork.DTO;
using SocNetwork.Extensions;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public static class ConvertHelper
    {
        public static ChatDTO ToChatDTO(Chat chat, User currentUser)
        {
            var chatDTO = new ChatDTO
            {
                MemberDTOs = new List<ShortProfileDTO>(),
                MessageDTOs = new List<MessageDTO>()
            };

            chat.CopyPropertiesTo(chatDTO);

            if (string.IsNullOrEmpty(chatDTO.Title))
            {
                chatDTO.Title = ChatHelper.GenerateChatTitle(chat, currentUser);
            }

            chatDTO.CoverDTO = ToMediaDTO(chat.Cover) ?? 
                ToMediaDTO(ChatHelper.GenerateChatCover(chat, currentUser));

            chat.Members.ForEach(m =>
            {
                chatDTO.MemberDTOs.Add(ToShortProfileDTO(m));
            });

            chat.Messages.ForEach(m =>
            {
                chatDTO.MessageDTOs.Add(ToMessageDTO(m));
            });

            return chatDTO;
        }

        public static ShortChatDTO ToShortChatDTO(Chat chat, User currentUser)
        {
            var shortChatDTO = new ShortChatDTO();

            chat.CopyPropertiesTo(shortChatDTO);

            if(string.IsNullOrEmpty(chat.Title))
            {
                shortChatDTO.Title = ChatHelper.GenerateChatTitle(chat, currentUser);
            }

            shortChatDTO.CoverPath = chat.Cover?.Path 
                ?? ChatHelper.GenerateChatCover(chat, currentUser)?.Path;

            if(chat.Messages.Any())
            {
                var lastMessage = chat.Messages.OrderBy(m => m.CreationDate).Last();

                shortChatDTO.LastMessageDTO = ToMessageDTO(lastMessage);
            }

            return shortChatDTO;
        }

        public static MediaDTO ToMediaDTO(Media media)
        {
            var mediaDTO = new MediaDTO();

            media.CopyPropertiesTo(mediaDTO);

            return mediaDTO;
        }

        public static MessageDTO ToMessageDTO(Message message)
        {
            var messageDTO = new MessageDTO();

            message.CopyPropertiesTo(messageDTO);

            message.MessageMedia.ForEach(m =>
            {
                messageDTO.MediaDTOs.Add(ToMediaDTO(m));
            });

            messageDTO.AuthorDTO = ToShortProfileDTO(message.Author);

            return messageDTO;
        }

        public static PostDTO ToPostDTO(Post post)
        {
            var postDTO = new PostDTO();

            post.CopyPropertiesTo(postDTO);

            post.PostMedia.ForEach(m =>
            {
                postDTO.MediaDTOs.Add(ToMediaDTO(m));
            });

            post.PostUsers.ForEach(pu =>
            {
                postDTO.UserPostDTOs.Add(ToUserPostDTO(pu));
            });

            postDTO.BestCommentDTO = ToCommentDTO(PostHelper.GetBestComment(post));

            postDTO.LikesNumber = post.PostUsers.Where(pu => pu.IsLiked).Count();

            return postDTO;
        }

        public static UserPostDTO ToUserPostDTO(UserPost userPost)
        {
            var userPostDTO = new UserPostDTO();

            userPost.CopyPropertiesTo(userPostDTO);

            userPostDTO.UserDTO = ToShortProfileDTO(userPost.User);

            return userPostDTO;
        }

        public static CommentDTO ToCommentDTO(Comment comment)
        {
            if (comment == null)
            {
                return null;
            }

            var commentDTO = new CommentDTO();

            comment.CopyPropertiesTo(commentDTO);

            comment.CommentMedia.ForEach(m =>
            {
                commentDTO.MediaDTOs.Add(ToMediaDTO(m));
            });

            comment.CommentUsers.ForEach(cu =>
            {
                commentDTO.UserCommentDTOs.Add(ToUserCommentDTO(cu));
            });

            return commentDTO;
        }

        public static UserCommentDTO ToUserCommentDTO(UserComment userComment)
        {
            var userCommentDTO = new UserCommentDTO();

            userComment.CopyPropertiesTo(userCommentDTO);

            userCommentDTO.UserDTO = ToShortProfileDTO(userComment.User);

            return userCommentDTO;
        }

        public static UserDTO ToUserDTO(User user)
        {
            var userDTO = new UserDTO();

            user.CopyPropertiesTo(userDTO);

            return userDTO;
        }

        public static ProfileDTO ToProfileDTO(User user)
        {
            var profileDTO = new ProfileDTO();

            user.CopyPropertiesTo(profileDTO);

            user.ProfileMedia.ForEach(m =>
            {
                profileDTO.MediaDTOs.Add(ToProfileMediaDTO(m));
            });

            profileDTO.AvatarPath = UsersHelper.GetCurrentAvatar(user)?.Path
                ?? UsersHelper.DEFAULT_AVATAR_PATH;
            profileDTO.CoverPath = UsersHelper.GetCurrentCover(user)?.Path;

            return profileDTO;
        }

        public static ShortProfileDTO ToShortProfileDTO(User user)
        {
            var shortProfileDTO = new ShortProfileDTO();

            user.CopyPropertiesTo(shortProfileDTO);

            shortProfileDTO.AvatarPath = UsersHelper.GetCurrentAvatar(user)?.Path
                ?? UsersHelper.DEFAULT_AVATAR_PATH;

            return shortProfileDTO;
        }

        public static ProfileMediaDTO ToProfileMediaDTO(ProfileMedia profileMedia)
        {
            var profileMediaDTO = new ProfileMediaDTO();

            profileMedia.CopyPropertiesTo(profileMediaDTO);

            return profileMediaDTO;
        }
        
        public static RelationshipDTO ToRelationshipDTO(UserRelationship relationship)
        {
            var relationshipDTO = new RelationshipDTO();

            relationship.CopyPropertiesTo(relationshipDTO);
            relationshipDTO.FromUserDTO = ToUserDTO(relationship.FromUser);
            relationshipDTO.ToUserDTO = ToUserDTO(relationship.ToUser);
            
            return relationshipDTO;
        }

        public static PostNotifDTO ToPostNotifDTO(PostNotification postNotif)
        {
            var postNotifDTO = new PostNotifDTO();

            postNotif.CopyPropertiesTo(postNotifDTO);
            postNotifDTO.SenderDTO = ToShortProfileDTO(postNotif.Sender);

            return postNotifDTO;
        }

        public static UserNotifDTO ToUserNotifDTO(UserNotification userNotif)
        {
            var userNotifDTO = new UserNotifDTO();

            userNotif.CopyPropertiesTo(userNotifDTO);
            userNotifDTO.SenderDTO = ToShortProfileDTO(userNotif.Sender);

            return userNotifDTO;
        }

        public static CommentNotifDTO ToCommentNotifDTO(CommentNotification commentNotif)
        {
            var commentNotifDTO = new CommentNotifDTO();

            commentNotif.CopyPropertiesTo(commentNotifDTO);
            commentNotifDTO.SenderDTO = ToShortProfileDTO(commentNotif.Sender);

            return commentNotifDTO;
        }
    }
}
