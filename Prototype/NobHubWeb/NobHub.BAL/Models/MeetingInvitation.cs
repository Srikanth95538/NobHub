using System;
using System.Collections.Generic;
using System.Text;

namespace NobHub.BAL.Models
{
    public class MeetingInvitation
    {
        public int Id { get; set; }
        public int Userid { get; set; }
        public string Participant { get; set; }
        public string Title { get; set; }
        public string Host { get; set; }
        public string Description { get; set; }
        public string EventDate { get; set; }
        public string Duration { get; set; }
        public string Date { get; set; }
        public string Createdstatus { get; set; }
        public DateTime Createddate { get; set; }
    }
    public class FriendInvitation
    {
        public int Guid { get; set; }
        public string Refid { get; set; }
        public string Fromdes { get; set; }
        public string Fromstatus { get; set; }
        public string Chatdes { get; set; }
        public string Cid { get; set; }
        public string Cdes { get; set; }
        public string Cstatus { get; set; }
        public string Inviteddate { get; set; }
        public string Accepteddate { get; set; }
        public string Fromreadstatus { get; set; }
        public string Creadstatus { get; set; }
        public string Custommsg { get; set; }
        public string RefidNickname { get; set; }
        public string CidNickname { get; set; }
        public string RefidBlock { get; set; }
        public string CidBlock { get; set; }
        public DateTime? Date { get; set; }
    }
}
