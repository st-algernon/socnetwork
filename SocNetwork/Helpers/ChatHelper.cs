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
        private const int DEFAULT_MESSAGES_NUM = 25;

        public ChatHelper(SocNetworkContext context)
        {
            db = context;
        }
        public Conversation CreateOrExisting(User currentUser, List<User> members)
        {
            db.Entry(currentUser).Collection(c => c.Conversations).Load();

            Conversation chat = null;

            foreach (var item in currentUser.Conversations)
            {
                db.Entry(item).Collection(c => c.Members).Load();

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

                db.Conversations.Add(chat);
                db.SaveChanges();
            } else {

                foreach (var member in chat.Members) {
                    db.Entry(member).Collection(c => c.ProfileMedia).Load();
                }

                db.Entry(chat)
                    .Collection(c => c.Messages)
                    .Query()
                    .Where(m => m.MessageStatus != MessageStatus.IsDeleted)
                    .OrderByDescending(m => m.CreationDate)
                    .Take(DEFAULT_MESSAGES_NUM)
                    .ToList();
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
