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
                chatDTO.Title = ChatHelper.GenerateChatName(chat, currentUser);
            }

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

            if (string.IsNullOrEmpty(shortChatDTO.Title))
            {
                shortChatDTO.Title = ChatHelper.GenerateChatName(chat, currentUser);
            }

            chat.Cover.CopyPropertiesTo(shortChatDTO.CoverDTO);

            var lastMessage = chat.Messages.Last();

            shortChatDTO.LastMessageDTO = ToMessageDTO(lastMessage);

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
                messageDTO.MessageMediaDTOs.Add(ToMediaDTO(m));
            });

            messageDTO.AuthorDTO = ToShortProfileDTO(message.Author);

            return messageDTO;
        }

        public static Message ToMessage(MessageDTO messageDTO)
        {
            var message = new Message();

            messageDTO.CopyPropertiesTo(message);

            return message;
        }

        public static ProfileDTO ToProfileDTO(User user)
        {
            var profileDTO = new ProfileDTO();

            user.CopyPropertiesTo(profileDTO);

            user.ProfileMedia.ForEach(m =>
            {
                profileDTO.ProfileMediaDTOs.Add(ToProfileMediaDTO(m));
            });

            return profileDTO;
        }

        public static ShortProfileDTO ToShortProfileDTO(User user)
        {
            var shortProfileDTO = new ShortProfileDTO();

            user.CopyPropertiesTo(shortProfileDTO);

            shortProfileDTO.AvatarDTO = UsersHelper.GetCurrentAvatar(user);

            return shortProfileDTO;
        }

        public static ProfileMediaDTO ToProfileMediaDTO(ProfileMedia profileMedia)
        {
            var profileMediaDTO = new ProfileMediaDTO();

            profileMedia.CopyPropertiesTo(profileMediaDTO);

            return profileMediaDTO;
        }
    }
}
