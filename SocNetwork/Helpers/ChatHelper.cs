using SocNetwork.DTO;
using SocNetwork.Extensions;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public class ChatHelper
    {
        private readonly SocNetworkContext db;

        public ChatHelper(SocNetworkContext context)
        {
            db = context;
        }
        public Conversation ExistingOrEmpty(User currentUser, List<User> members)
        {
            db.Entry(currentUser).Collection(c => c.Conversations).Load();

            Conversation chat = null;

            foreach (var item in currentUser.Conversations)
            {
                if (item.Members.Except(members).Any() == false)
                {
                    chat = item;
                }
            }

            if (chat == null)
            {
                chat = new Conversation()
                {
                    Members = members,
                    Messages = new List<Message>(),
                    CreationDate = DateTime.Now
                };
            }

            return chat;
        }

        public ChatDTO ConvertToDTO(Conversation chat)
        {
            var chatDTO = new ChatDTO
            {
                MembersDTO = new List<ProfileDTO>(),
                MessagesDTO = new List<MessageDTO>()
            };

            chat.CopyPropertiesTo(chatDTO);

            var usersHelper = new UsersHelper(db);

            chat.Members.ForEach(m =>
            {
                chatDTO.MembersDTO.Add(usersHelper.GetProfileDTO(m));
            });

            var messagesHelper = new MessagesHelper(db);

            chat.Messages.ForEach(m =>
            {
                chatDTO.MessagesDTO.Add(messagesHelper.ConvertToDTO(m));
            });

            return chatDTO;
        }
    }
}
