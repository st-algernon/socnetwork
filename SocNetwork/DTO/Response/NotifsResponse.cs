using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocNetwork.DTO.Response
{
    public class NotifsResponse
    {
        public bool Result { get; set; }
        public List<PostNotifDTO> PostNotifDTOs { get; set; }
        public List<UserNotifDTO> UserNotifDTOs { get; set; }
        public List<CommentNotifDTO> CommentNotifDTOs { get; set; }
        public List<string> Errors { get; set; }
        public NotifsResponse()
        {
            PostNotifDTOs = new List<PostNotifDTO>();
            UserNotifDTOs = new List<UserNotifDTO>();
            CommentNotifDTOs = new List<CommentNotifDTO>();
        }
    }
}
