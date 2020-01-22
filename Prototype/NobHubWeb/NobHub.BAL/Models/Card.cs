
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
namespace NobHub.BAL.Models
{
        public class TempElement
    {
        public int Id { get; set; }
        public string Cardlementtagname { get; set; }        
        public int ElementgroupId { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public string FontColor { get; set; }
        public int? FontSize { get; set; }
        public string FontWeight { get; set; }
        public string iconImagePostiion { get; set; }
        public int? iconImageId { get; set; }       
        public string elementlineHeight { get; set; }
    }

    public class CardElement
    {
        public int Id { get; set; }
        public string Cardlementtagname { get; set; }      
        public string CardArea { get; set; }
        public int ElementgroupId { get; set; }
        public string ElementTypeName { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public string FontColor { get; set; }
        public int? FontSize { get; set; }
        public string FontWeight { get; set; }
        public sbyte? TextVertical { get; set; }
        public sbyte? TextHorizontal { get; set; }
        public string IconImageUrl { get; set; }
        public string IconImagePostiion { get; set; }
        public int? IconImageId { get; set; }
        public string Iconfile { get; set; }
        public string Cardelementtext { get; set; }
        public string Elementlineheight { get; set; }
    }
    public  class BusinessCard
    {
        public BusinessCard()
        {
            this.Elements = new List<CardElement>();
        }
        public string UserName { get; set; }
        public int CardId { get; set; }
        public string Cardname { get; set; }
        public sbyte Cardshape { get; set; }
        public int? Category { get; set; }
        public int Borderradius { get; set; }
        public string Cardfrontfile { get; set; }
        public string Cardbackfile { get; set; }
        public bool Ispublished { get; set; }
      //  public bool Isuserspecific { get; set; }
        public int? Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public int? Updatedby { get; set; }
        public DateTime? Updateddate { get; set; }
        public int? Orginalcardid { get; set; }
        public int UserCount { get; set; }
        public bool  IsDefault { get; set; }

        public List<CardElement> Elements { get; set; }

        public string StrElements { get; set; }
        public string  CategoryName { get; set; }
        public string IscameFrom { get; set; }
        public bool BorderradiusDisable { get; set; }
        public bool IsFrontImageExist { get; set; }
        public bool IsBackImageExist { get; set; }
        public string StaticText { get; set; }
        public bool CopyImage { get; set; }
        public string staticimageFile { get; set; }
        public bool PickORCloneImg { get; set; }


    }   

    public class Lookup
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    public class ElementIconsLookup
    {
        public int Id { get; set; }
        public string IconName { get; set; }
        public string IconFile { get; set; }
    }

    public class CardCategories
    {
        public int categorieID { get; set; }
        public string categorieName { get; set; }
        public string Image { get; set; }
        public string categoryFileName { get; set; }
        public DateTime? Date { get; set; }
    }
    public class UpdateElementDimensions
    {
        public int UserId { get; set; }
        public int ElementId { get; set; }
        public int FontSize { get; set; }
        public string FontColor { get; set; }
        public int PositionX { get; set; }
        public int PositionY { get; set; }
    }
    public class Professions
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
    }
    public class cardicons
    {
        public int iconId { get; set; }
        public string iconName { get; set; }
        public string iconFileName { get; set; }
      
    }

    public class RegisteredUsers
    {
        public int Guid { get; set; }
        public string Name { get; set; }
        public string CountryCode { get; set; }
        public string Mobile { get; set; }
        public string Status { get; set; }
        public DateTime? Date { get; set; }
        public string Deviceid { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Skype { get; set; }
        public string Linkedin { get; set; }
        public string Nameshow { get; set; }
        public string Emailshow { get; set; }
        public string Mobilenumbershow { get; set; }
        public string Addressshow { get; set; }
        public string Facebookshow { get; set; }
        public string Twittershow { get; set; }
        public string Skypeshow { get; set; }
        public string Linkedinshow { get; set; }
        public string Image { get; set; }
        public string Imageshow { get; set; }
        public string Lastname { get; set; }
        public string Homephone { get; set; }
        public string Companyname { get; set; }
        public string Title { get; set; }
        public string Department { get; set; }
        public string Cemail { get; set; }
        public string Website { get; set; }
        public string Caddress { get; set; }
        public string Cmobile { get; set; }
        public string Exten { get; set; }
        public string Fax { get; set; }
        public string Logo { get; set; }
        public string Lastnameshow { get; set; }
        public string Homephoneshow { get; set; }
        public string Companynameshow { get; set; }
        public string Titleshow { get; set; }
        public string Departmentshow { get; set; }
        public string Cemailshow { get; set; }
        public string Websiteshow { get; set; }
        public string Caddressshow { get; set; }
        public string Cmobileshow { get; set; }
        public string Profession { get; set; }
        public string Extshow { get; set; }
        public string Faxshow { get; set; }
        public string Logoshow { get; set; }
        public string Theme { get; set; }
        public string Lati { get; set; }
        public string Longi { get; set; }
        public string Regid { get; set; }
        public string Mycode { get; set; }
        public string Ccode { get; set; }
        public string Cnumber { get; set; }
        public string Referalcode { get; set; }
        public int Points { get; set; }
        public string Country { get; set; }
        public DateTime Lastseen { get; set; }
        public string Timezone { get; set; }
        public string Otp { get; set; }
        public string Membership { get; set; }
        public string CardFrontFile { get; set; }
        public string CardBackFile { get; set; }
        public string NameORMobilOREmail { get; set; }
    }
    public class useridFCMToken
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FCMToken { get; set; }
        public string type { get; set; }
        public int loginUserId { get; set; }

    }
    public class ChannelForUsers
    {
        public int fromUserID { get; set; }
        public int toUserId { get; set; }

    }
    public class UserMsg
    {
        public int ChannelId { get; set; }
        public int FromUserId { get; set; }
        public string  message { get; set; }
    }
    public class NearbyInvites
    {
        public int Guid { get; set; }
        public int Refid { get; set; }
        public string Fromdes { get; set; }
        public string Fromstatus { get; set; }
        public string Chatdes { get; set; }
        public int Cid { get; set; }
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
        public DateTime Date { get; set; }
        public string body { get; set; }
        public string type { get; set; }
    }

    public class channelmsgs
    {
        public int channelId { get; set; }
        public int FromuserId { get; set; }
        public int TouserId { get; set; }
        public List<channelmessageobj> messages { get; set; }
        public string strmessage { get; set; }
        public string LoginUserFcmToken { get; set; }

    }
    public class channelmessageobj
    { 
        public long _id { get; set; }
        public string text { get; set; }
        public user user { get; set; }
        public long messageId { get; set; }
        public bool Isread { get; set; }
        public DateTime createdAt { get; set; }
        public int ChannelId { get; set; }
    }
    public class user
    {
        public int _id { get; set; }
    }




}
