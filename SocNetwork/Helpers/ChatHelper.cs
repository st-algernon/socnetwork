using Microsoft.EntityFrameworkCore;
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
        private const int DEFAULT_LAST_MESSAGES_NUM = 25;

        public ChatHelper(SocNetworkContext context)
        {
            db = context;
        }

        public async Task<List<Conversation>> GetUserChatsAsync(User user)
        {
            await db.Entry(user).Collection(c => c.Conversations).LoadAsync();

            //var mychats = db.Conversations
            //    .Where(c => c.Members.Contains(user))
            //    .Include(c => c.Members)
            //    .ThenInclude(m => m.ProfileMedia)
            //    .Include(c => c.Messages)
            //    .Select(c => new Conversation { c.Messages.Take(DEFAULT_MESSAGES_NUM).ToList() })
            //    .ToList();
            //var mychats2 = db.Users..FirstOrDefault(u => u.Id == user.Id);
            //var chats = db.Conversations.Include(c => c.Members)
            //    .ThenInclude(m => m.ProfileMedia).Include(c => c.Messages).Select(c => {  }).ToList();
       
            foreach (var chat in user.Conversations)
            {
                await LoadChatUserMediaAsync(chat);
                await LoadLastChatMessagesAsync(chat, DEFAULT_LAST_MESSAGES_NUM);
            }

            return user.Conversations;
        }

        public async Task<Conversation> GetChatByMembersAsync(List<User> members)
        {
            List<Conversation> chats = db.Conversations
                .Include(c => c.Members)
                .ToList();

            Conversation wantedChat = null;

            foreach (var chat in chats)
            {
                if (!chat.Members.Except(members).Any() && !members.Except(chat.Members).Any())
                {
                    wantedChat = chat;
                    await LoadChatUserMediaAsync(wantedChat);
                    await LoadLastChatMessagesAsync(wantedChat, DEFAULT_LAST_MESSAGES_NUM);
                }
            }

            return wantedChat;
        }

        public async Task<Conversation> CreateChatAsync(List<User> members)
        {
            var chat = new Conversation()
            {
                Members = members,
                Messages = new List<Message>(),
                CreationDate = DateTime.Now
            };

            await db.Conversations.AddAsync(chat);
            await db.SaveChangesAsync();

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

        public async Task LoadChatUserMediaAsync(Conversation chat)
        {
            await db.Entry(chat).Collection(c => c.Members).LoadAsync();

            foreach (var member in chat.Members)
            {
                await db.Entry(member).Collection(m => m.ProfileMedia).LoadAsync();
            }
        }

        public async Task LoadLastChatMessagesAsync(Conversation chat, int number)
        {
            await db.Entry(chat)
                .Collection(c => c.Messages)
                .Query()
                .Where(m => m.MessageStatus != MessageStatus.IsDeleted)
                .OrderByDescending(m => m.CreationDate)
                .Take(number)
                .ToListAsync();
        }
    }
}
