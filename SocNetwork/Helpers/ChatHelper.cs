﻿using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Chat>> GetUserChatsAsync(User user)
        {
            await db.Entry(user).Collection(c => c.Chats).LoadAsync();
       
            foreach (var chat in user.Chats)
            {
                await LoadChatUserMediaAsync(chat);
                await LoadLastChatMessagesAsync(chat, DEFAULT_LAST_MESSAGES_NUM);
            }

            return user.Chats;
        }

        public async Task<Chat> GetChatByMembersAsync(List<User> members)
        {
            List<Chat> chats = db.Chats
                .Include(c => c.Members)
                .ToList();

            Chat wantedChat = null;

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

        public async Task<Chat> CreateChatAsync(List<User> members)
        {
            var chat = new Chat()
            {
                Members = members,
                Messages = new List<Message>(),
                CreationDate = DateTime.Now
            };

            await db.Chats.AddAsync(chat);
            await db.SaveChangesAsync();

            return chat;
        }

        public async Task LoadChatUserMediaAsync(Chat chat)
        {
            await db.Entry(chat).Collection(c => c.Members).LoadAsync();

            foreach (var member in chat.Members)
            {
                await db.Entry(member).Collection(m => m.ProfileMedia).LoadAsync();
            }
        }

        public async Task LoadLastChatMessagesAsync(Chat chat, int number)
        {
            await db.Entry(chat)
                .Collection(c => c.Messages)
                .Query()
                .Where(m => m.MessageStatus != MessageStatus.IsDeleted)
                .OrderByDescending(m => m.CreationDate)
                .Take(number)
                .ToListAsync();
        }

        public static string GenerateChatName(Chat chat, User currentUser)
        {
            var otherMembers = chat.Members.Except(new List<User> { currentUser }).ToList();
            var namesOfOthers = new List<string>();

            otherMembers.ForEach(m => namesOfOthers.Add(m.Name));

            return string.Join(", ", namesOfOthers);
        }
    }
}
