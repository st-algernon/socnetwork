using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class NotifsResponse
    {
        public bool Result { get; set; }
        public List<NotificationDTO> NotificDTOs { get; set; }
        public List<string> Errors { get; set; }
        public NotifsResponse()
        {
            NotificDTOs = new List<NotificationDTO>();
        }
    }
}
