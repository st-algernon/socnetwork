using SocNetwork.DTO;
using SocNetwork.Extensions;
using SocNetwork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.Helpers
{
    public class MessagesHelper
    {
        private readonly SocNetworkContext db;

        public MessagesHelper(SocNetworkContext context)
        {
            db = context;
        }

        public MessageDTO ConvertToDTO(Message message)
        {
            var messageDTO = new MessageDTO();

            message.CopyPropertiesTo(messageDTO);
            
            messageDTO.MessageMediaDTO = ConvertMediaToDTO(message.MessageAttachments);

            return messageDTO;
        }

        public List<MediaDTO> ConvertMediaToDTO(List<MessageMedia> media)
        {
            var mediaDTO = new List<MediaDTO>();

            media.ForEach(m =>
            {
                var mDTO = new MediaDTO();
                m.CopyPropertiesTo(mDTO);
                mediaDTO.Add(mDTO);
            });

            return mediaDTO;
        }
    }
}
