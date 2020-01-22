using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using NobHub.Common;

namespace NobHub.DAL.Models
{
    public partial class nobhubtestContext : DbContext
    {
        public nobhubtestContext()
        {
        }

        public nobhubtestContext(DbContextOptions<nobhubtestContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Alerts> Alerts { get; set; }
        public virtual DbSet<BusinessCards> BusinessCards { get; set; }
        public virtual DbSet<CardelementgroupsLookup> CardelementgroupsLookup { get; set; }
        public virtual DbSet<Cardelementimages> Cardelementimages { get; set; }
        public virtual DbSet<Cardelements> Cardelements { get; set; }
        public virtual DbSet<Cardelementtypes> Cardelementtypes { get; set; }
        public virtual DbSet<CardiconsLookup> CardiconsLookup { get; set; }
        public virtual DbSet<Cards> Cards { get; set; }
        public virtual DbSet<CardsCategories> CardsCategories { get; set; }
        public virtual DbSet<CardsLookup> CardsLookup { get; set; }
        public virtual DbSet<Cardsbak> Cardsbak { get; set; }
        public virtual DbSet<Channelgroups> Channelgroups { get; set; }
        public virtual DbSet<Channelmessages> Channelmessages { get; set; }
        public virtual DbSet<Channels> Channels { get; set; }
        public virtual DbSet<Chat> Chat { get; set; }
        public virtual DbSet<Createcards> Createcards { get; set; }
        public virtual DbSet<Devicefcmtoken> Devicefcmtoken { get; set; }
        public virtual DbSet<DummyUser> DummyUser { get; set; }
        public virtual DbSet<Invites> Invites { get; set; }
        public virtual DbSet<Login> Login { get; set; }
        public virtual DbSet<Meetingalerts> Meetingalerts { get; set; }
        public virtual DbSet<Meetings> Meetings { get; set; }
        public virtual DbSet<Nearbyinvitations> Nearbyinvitations { get; set; }
        public virtual DbSet<Newmeetings> Newmeetings { get; set; }
        public virtual DbSet<Profession> Profession { get; set; }
        public virtual DbSet<Register> Register { get; set; }
        public virtual DbSet<Usercardelements> Usercardelements { get; set; }
        public virtual DbSet<Userchannels> Userchannels { get; set; }
        public virtual DbSet<Usermessages> Usermessages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                // optionsBuilder.UseMySql("server=10.200.0.23;port=3306;user=root;password=welcome1!;database=nobhubtest");
                optionsBuilder.UseMySql(AppUtilities.GetConnectionString());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Alerts>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("alerts");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Alertdate)
                    .IsRequired()
                    .HasColumnName("alertdate")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Msg)
                    .IsRequired()
                    .HasColumnName("msg")
                    .HasColumnType("text");

                entity.Property(e => e.Readstatus)
                    .IsRequired()
                    .HasColumnName("readstatus")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Refid)
                    .IsRequired()
                    .HasColumnName("refid")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("type")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(50)");
            });

            modelBuilder.Entity<BusinessCards>(entity =>
            {
                entity.HasKey(e => e.CardId)
                    .HasName("PRIMARY");

                entity.ToTable("business_cards");

                entity.Property(e => e.CardId)
                    .HasColumnName("card_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Borderradius)
                    .HasColumnName("borderradius")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Cardbackfile)
                    .HasColumnName("cardbackfile")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Cardfrontfile)
                    .HasColumnName("cardfrontfile")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Cardname)
                    .IsRequired()
                    .HasColumnName("cardname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Cardshape)
                    .HasColumnName("cardshape")
                    .HasColumnType("tinyint(4)");

                entity.Property(e => e.Category)
                    .HasColumnName("category")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Createdby)
                    .HasColumnName("createdby")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Isdefault)
                    .HasColumnName("isdefault")
                    .HasColumnType("bit(1)");

                entity.Property(e => e.Ispublished)
                    .HasColumnName("ispublished")
                    .HasColumnType("bit(1)");

                entity.Property(e => e.Staticimage)
                    .HasColumnName("staticimage")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Statictext)
                    .HasColumnName("statictext")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Updatedby)
                    .HasColumnName("updatedby")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Updateddate)
                    .HasColumnName("updateddate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Usercount)
                    .HasColumnName("usercount")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<CardelementgroupsLookup>(entity =>
            {
                entity.HasKey(e => e.CardelementId)
                    .HasName("PRIMARY");

                entity.ToTable("cardelementgroups_lookup");

                entity.Property(e => e.CardelementId)
                    .HasColumnName("cardelementId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Cardelementname)
                    .HasColumnName("cardelementname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Cardelementtype)
                    .HasColumnName("cardelementtype")
                    .HasColumnType("varchar(45)");
            });

            modelBuilder.Entity<Cardelementimages>(entity =>
            {
                entity.ToTable("cardelementimages");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Cardelementid)
                    .HasColumnName("cardelementid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Imagedata)
                    .HasColumnName("imagedata")
                    .HasColumnType("longtext");
            });

            modelBuilder.Entity<Cardelements>(entity =>
            {
                entity.ToTable("cardelements");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.CardArea)
                    .IsRequired()
                    .HasColumnName("cardArea")
                    .HasColumnType("char(1)");

                entity.Property(e => e.CardId).HasColumnType("int(11)");

                entity.Property(e => e.Cardelementtext)
                    .HasColumnName("cardelementtext")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Cardlementtagname)
                    .IsRequired()
                    .HasColumnName("cardlementtagname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.ElementgroupId).HasColumnType("int(11)");

                entity.Property(e => e.Elementlineheight)
                    .HasColumnName("elementlineheight")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.FontColor).HasColumnType("varchar(45)");

                entity.Property(e => e.FontSize).HasColumnType("int(11)");

                entity.Property(e => e.FontWeight).HasColumnType("varchar(45)");

                entity.Property(e => e.Height).HasColumnType("int(11)");

                entity.Property(e => e.IconImageId).HasColumnType("int(11)");

                entity.Property(e => e.IconImagePostiion).HasColumnType("char(1)");

                entity.Property(e => e.IconImageUrl)
                    .HasColumnName("IconImageURL")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.PositionX).HasColumnType("int(11)");

                entity.Property(e => e.PositionY).HasColumnType("int(11)");

                entity.Property(e => e.TextHorizontal).HasColumnType("tinyint(4)");

                entity.Property(e => e.TextVertical).HasColumnType("tinyint(4)");

                entity.Property(e => e.Width).HasColumnType("int(11)");
            });

            modelBuilder.Entity<Cardelementtypes>(entity =>
            {
                entity.HasKey(e => e.ElementtypeId)
                    .HasName("PRIMARY");

                entity.ToTable("cardelementtypes");

                entity.Property(e => e.ElementtypeId)
                    .HasColumnName("elementtypeId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Elementtypename)
                    .HasColumnName("elementtypename")
                    .HasColumnType("varchar(45)");
            });

            modelBuilder.Entity<CardiconsLookup>(entity =>
            {
                entity.HasKey(e => e.Cardiconid)
                    .HasName("PRIMARY");

                entity.ToTable("cardicons_lookup");

                entity.Property(e => e.Cardiconid)
                    .HasColumnName("cardiconid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Iconfile)
                    .HasColumnName("iconfile")
                    .HasColumnType("varchar(500)");

                entity.Property(e => e.Iconfiletype)
                    .HasColumnName("iconfiletype")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Iconname)
                    .IsRequired()
                    .HasColumnName("iconname")
                    .HasColumnType("varchar(100)");
            });

            modelBuilder.Entity<Cards>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("cards");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Back)
                    .IsRequired()
                    .HasColumnName("back")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Cardname)
                    .IsRequired()
                    .HasColumnName("cardname")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Cardnameback)
                    .IsRequired()
                    .HasColumnName("cardnameback")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Category)
                    .HasColumnName("category")
                    .HasColumnType("int(50)");

                entity.Property(e => e.Front)
                    .IsRequired()
                    .HasColumnName("front")
                    .HasColumnType("varchar(255)");
            });

            modelBuilder.Entity<CardsCategories>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("cards_categories");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(200)");
            });

            modelBuilder.Entity<CardsLookup>(entity =>
            {
                entity.HasKey(e => e.CardId)
                    .HasName("PRIMARY");

                entity.ToTable("cards_lookup");

                entity.Property(e => e.CardId)
                    .HasColumnName("card_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Borderradious)
                    .HasColumnName("borderradious")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Cardbackfile)
                    .HasColumnName("cardbackfile")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Cardfrontfile)
                    .HasColumnName("cardfrontfile")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Cardname)
                    .IsRequired()
                    .HasColumnName("cardname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Cardnameback)
                    .IsRequired()
                    .HasColumnName("cardnameback")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Category)
                    .HasColumnName("category")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Height)
                    .HasColumnName("height")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Width)
                    .HasColumnName("width")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Cardsbak>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("cardsbak");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Cardname)
                    .IsRequired()
                    .HasColumnName("cardname")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Cardnameback)
                    .IsRequired()
                    .HasColumnName("cardnameback")
                    .HasColumnType("varchar(250)");
            });

            modelBuilder.Entity<Channelgroups>(entity =>
            {
                entity.HasKey(e => e.Channelid)
                    .HasName("PRIMARY");

                entity.ToTable("channelgroups");

                entity.Property(e => e.Channelid)
                    .HasColumnName("channelid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Groupadminid)
                    .HasColumnName("groupadminid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Groupname)
                    .IsRequired()
                    .HasColumnName("groupname")
                    .HasColumnType("varchar(45)");

                entity.HasOne(d => d.Channel)
                    .WithOne(p => p.Channelgroups)
                    .HasForeignKey<Channelgroups>(d => d.Channelid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("channelgroups_channelid");
            });

            modelBuilder.Entity<Channelmessages>(entity =>
            {
                entity.ToTable("channelmessages");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.Channelid)
                    .HasColumnName("channelid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnName("message")
                    .HasColumnType("varchar(5000)");

                entity.Property(e => e.Sentdate)
                    .HasColumnName("sentdate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Channels>(entity =>
            {
                entity.HasKey(e => e.Channelid)
                    .HasName("PRIMARY");

                entity.ToTable("channels");

                entity.Property(e => e.Channelid)
                    .HasColumnName("channelid")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Chat>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("chat");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.ChatDes)
                    .IsRequired()
                    .HasColumnName("chat_des")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Cstatus)
                    .IsRequired()
                    .HasColumnName("cstatus")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Datetime)
                    .HasColumnName("datetime")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Inputby)
                    .HasColumnName("inputby")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.InputbyStatus)
                    .IsRequired()
                    .HasColumnName("inputby_status")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnName("message")
                    .HasColumnType("text");

                entity.Property(e => e.Msgtype)
                    .IsRequired()
                    .HasColumnName("msgtype")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Receivedtime)
                    .IsRequired()
                    .HasColumnName("receivedtime")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Refid)
                    .HasColumnName("refid")
                    .HasColumnType("int(50)");

                entity.Property(e => e.RefidStatus)
                    .IsRequired()
                    .HasColumnName("refid_status")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status")
                    .HasColumnType("varchar(30)");
            });

            modelBuilder.Entity<Createcards>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("createcards");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.AddressColor)
                    .IsRequired()
                    .HasColumnName("address_color")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.AddressFontfamily)
                    .IsRequired()
                    .HasColumnName("address_fontfamily")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.AddressFontsize)
                    .IsRequired()
                    .HasColumnName("address_fontsize")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.AddressFontweight)
                    .IsRequired()
                    .HasColumnName("address_fontweight")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Back)
                    .IsRequired()
                    .HasColumnName("back")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Cardname)
                    .IsRequired()
                    .HasColumnName("cardname")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Category)
                    .HasColumnName("category")
                    .HasColumnType("int(50)");

                entity.Property(e => e.CompanyAddressColor)
                    .IsRequired()
                    .HasColumnName("company_address_color")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyAddressFontfamily)
                    .IsRequired()
                    .HasColumnName("company_address_fontfamily")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyAddressFontsize)
                    .IsRequired()
                    .HasColumnName("company_address_fontsize")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyAddressFontweight)
                    .IsRequired()
                    .HasColumnName("company_address_fontweight")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyColor)
                    .IsRequired()
                    .HasColumnName("company_color")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.CompanyEmailColor)
                    .IsRequired()
                    .HasColumnName("company_email_color")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyEmailFontfamily)
                    .IsRequired()
                    .HasColumnName("company_email_fontfamily")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyEmailFontsize)
                    .IsRequired()
                    .HasColumnName("company_email_fontsize")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyEmailFontweight)
                    .IsRequired()
                    .HasColumnName("company_email_fontweight")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyFontfamily)
                    .IsRequired()
                    .HasColumnName("company_fontfamily")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.CompanyFontsize)
                    .IsRequired()
                    .HasColumnName("company_fontsize")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.CompanyFontweight)
                    .IsRequired()
                    .HasColumnName("company_fontweight")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.CompanyLogoHeight)
                    .IsRequired()
                    .HasColumnName("company_logo_height")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyLogoWidth)
                    .IsRequired()
                    .HasColumnName("company_logo_width")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyPhoneColor)
                    .IsRequired()
                    .HasColumnName("company_phone_color")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyPhoneFontfamily)
                    .IsRequired()
                    .HasColumnName("company_phone_fontfamily")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyPhoneFontsize)
                    .IsRequired()
                    .HasColumnName("company_phone_fontsize")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyPhoneFontweight)
                    .IsRequired()
                    .HasColumnName("company_phone_fontweight")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyWebsiteColor)
                    .IsRequired()
                    .HasColumnName("company_website_color")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyWebsiteFontfamily)
                    .IsRequired()
                    .HasColumnName("company_website_fontfamily")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyWebsiteFontsize)
                    .IsRequired()
                    .HasColumnName("company_website_fontsize")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CompanyWebsiteFontweight)
                    .IsRequired()
                    .HasColumnName("company_website_fontweight")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.DepartmentColor)
                    .IsRequired()
                    .HasColumnName("department_color")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.DepartmentFontfamily)
                    .IsRequired()
                    .HasColumnName("department_fontfamily")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.DepartmentFontsize)
                    .IsRequired()
                    .HasColumnName("department_fontsize")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.DepartmentFontweight)
                    .IsRequired()
                    .HasColumnName("department_fontweight")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.DepartmentIcon)
                    .IsRequired()
                    .HasColumnName("department_icon")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.EmailColor)
                    .IsRequired()
                    .HasColumnName("email_color")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.EmailFontfamily)
                    .IsRequired()
                    .HasColumnName("email_fontfamily")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.EmailFontsize)
                    .IsRequired()
                    .HasColumnName("email_fontsize")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.EmailFontweight)
                    .IsRequired()
                    .HasColumnName("email_fontweight")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.EmailIcon)
                    .IsRequired()
                    .HasColumnName("email_icon")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Facebook)
                    .IsRequired()
                    .HasColumnName("facebook")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.FacebookIconHeight)
                    .IsRequired()
                    .HasColumnName("facebook_icon_height")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.FacebookIconWidth)
                    .IsRequired()
                    .HasColumnName("facebook_icon_width")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.FnameColor)
                    .IsRequired()
                    .HasColumnName("fname_color")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.FnameFontfamily)
                    .IsRequired()
                    .HasColumnName("fname_fontfamily")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.FnameFontsize)
                    .IsRequired()
                    .HasColumnName("fname_fontsize")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.FnameFontweight)
                    .IsRequired()
                    .HasColumnName("fname_fontweight")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Front)
                    .IsRequired()
                    .HasColumnName("front")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Linkedin)
                    .IsRequired()
                    .HasColumnName("linkedin")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.LinkedinIconHeight)
                    .IsRequired()
                    .HasColumnName("linkedin_icon_height")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.LinkedinIconWidth)
                    .IsRequired()
                    .HasColumnName("linkedin_icon_width")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.LnameColor)
                    .IsRequired()
                    .HasColumnName("lname_color")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.LnameFontfamily)
                    .IsRequired()
                    .HasColumnName("lname_fontfamily")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.LnameFontsize)
                    .IsRequired()
                    .HasColumnName("lname_fontsize")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.LnameFontweight)
                    .IsRequired()
                    .HasColumnName("lname_fontweight")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.LocationIcon)
                    .IsRequired()
                    .HasColumnName("location_icon")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.MobileColor)
                    .IsRequired()
                    .HasColumnName("mobile_color")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.MobileFontfamily)
                    .IsRequired()
                    .HasColumnName("mobile_fontfamily")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.MobileFontsize)
                    .IsRequired()
                    .HasColumnName("mobile_fontsize")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.MobileFontweight)
                    .IsRequired()
                    .HasColumnName("mobile_fontweight")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.MobileIcon)
                    .IsRequired()
                    .HasColumnName("mobile_icon")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.ProfilePicHeight)
                    .IsRequired()
                    .HasColumnName("profile_pic_height")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.ProfilePicWidth)
                    .IsRequired()
                    .HasColumnName("profile_pic_width")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Skype)
                    .IsRequired()
                    .HasColumnName("skype")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.SkypeIconHeight)
                    .IsRequired()
                    .HasColumnName("skype_icon_height")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.SkypeIconWidth)
                    .IsRequired()
                    .HasColumnName("skype_icon_width")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.TitleColor)
                    .IsRequired()
                    .HasColumnName("title_color")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.TitleFontfamily)
                    .IsRequired()
                    .HasColumnName("title_fontfamily")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.TitleFontsize)
                    .IsRequired()
                    .HasColumnName("title_fontsize")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.TitleFontweight)
                    .HasColumnName("title_fontweight")
                    .HasColumnType("int(255)");

                entity.Property(e => e.Twitter)
                    .IsRequired()
                    .HasColumnName("twitter")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.TwitterIconHeight)
                    .IsRequired()
                    .HasColumnName("twitter_icon_height")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.TwitterIconWidth)
                    .IsRequired()
                    .HasColumnName("twitter_icon_width")
                    .HasColumnType("varchar(100)");
            });

            modelBuilder.Entity<Devicefcmtoken>(entity =>
            {
                entity.ToTable("devicefcmtoken");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Fcmtoken)
                    .HasColumnName("fcmtoken")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<DummyUser>(entity =>
            {
                entity.ToTable("dummy_user");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Address).HasColumnType("varchar(45)");

                entity.Property(e => e.Addressshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Caddress).HasColumnType("varchar(45)");

                entity.Property(e => e.Caddressshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Ccode).HasColumnType("varchar(45)");

                entity.Property(e => e.Cemail).HasColumnType("varchar(45)");

                entity.Property(e => e.Cemailshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Cmobile).HasColumnType("varchar(45)");

                entity.Property(e => e.Cmobileshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Cnumber).HasColumnType("varchar(45)");

                entity.Property(e => e.Companyname).HasColumnType("varchar(45)");

                entity.Property(e => e.Companynameshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Country).HasColumnType("varchar(45)");

                entity.Property(e => e.CountryCode).HasColumnType("varchar(45)");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Department).HasColumnType("varchar(45)");

                entity.Property(e => e.Departmentshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Deviceid).HasColumnType("varchar(45)");

                entity.Property(e => e.Email).HasColumnType("varchar(45)");

                entity.Property(e => e.Emailshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Exten).HasColumnType("varchar(45)");

                entity.Property(e => e.Extshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Facebook).HasColumnType("varchar(45)");

                entity.Property(e => e.Facebookshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Fax).HasColumnType("varchar(45)");

                entity.Property(e => e.Faxshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Homephone).HasColumnType("varchar(45)");

                entity.Property(e => e.Homephoneshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Image).HasColumnType("varchar(45)");

                entity.Property(e => e.Imageshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Lastname).HasColumnType("varchar(45)");

                entity.Property(e => e.Lastnameshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Lastseen).HasColumnType("datetime");

                entity.Property(e => e.Lati).HasColumnType("varchar(45)");

                entity.Property(e => e.Linkedin).HasColumnType("varchar(45)");

                entity.Property(e => e.Linkedinshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Logo).HasColumnType("varchar(45)");

                entity.Property(e => e.Logoshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Longi).HasColumnType("varchar(45)");

                entity.Property(e => e.Membership).HasColumnType("varchar(45)");

                entity.Property(e => e.Mobile).HasColumnType("varchar(45)");

                entity.Property(e => e.Mobilenumbershow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Mycode).HasColumnType("varchar(45)");

                entity.Property(e => e.Name).HasColumnType("varchar(45)");

                entity.Property(e => e.Nameshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Otp).HasColumnType("varchar(45)");

                entity.Property(e => e.Points).HasColumnType("int(11)");

                entity.Property(e => e.Profession).HasColumnType("varchar(45)");

                entity.Property(e => e.Referalcode).HasColumnType("varchar(45)");

                entity.Property(e => e.Regid).HasColumnType("varchar(45)");

                entity.Property(e => e.Skype).HasColumnType("varchar(45)");

                entity.Property(e => e.Skypeshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Status).HasColumnType("varchar(45)");

                entity.Property(e => e.Theme).HasColumnType("varchar(45)");

                entity.Property(e => e.Timezone).HasColumnType("varchar(45)");

                entity.Property(e => e.Title).HasColumnType("varchar(45)");

                entity.Property(e => e.Titleshow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Twitter).HasColumnType("varchar(45)");

                entity.Property(e => e.Twittershow).HasColumnType("tinyint(4)");

                entity.Property(e => e.Website).HasColumnType("varchar(45)");

                entity.Property(e => e.Websiteshow).HasColumnType("tinyint(4)");
            });

            modelBuilder.Entity<Invites>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("invites");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Accepteddate)
                    .HasColumnName("accepteddate")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Cdes)
                    .HasColumnName("cdes")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Chatdes)
                    .HasColumnName("chatdes")
                    .HasColumnType("text");

                entity.Property(e => e.Cid)
                    .IsRequired()
                    .HasColumnName("cid")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.CidBlock)
                    .HasColumnName("cid_block")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.CidNickname)
                    .HasColumnName("cid_nickname")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Creadstatus)
                    .HasColumnName("creadstatus")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Cstatus)
                    .HasColumnName("cstatus")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Custommsg)
                    .HasColumnName("custommsg")
                    .HasColumnType("text");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Fromdes)
                    .HasColumnName("fromdes")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Fromreadstatus)
                    .HasColumnName("fromreadstatus")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Fromstatus)
                    .HasColumnName("fromstatus")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Inviteddate)
                    .HasColumnName("inviteddate")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Refid)
                    .IsRequired()
                    .HasColumnName("refid")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.RefidBlock)
                    .HasColumnName("refid_block")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.RefidNickname)
                    .HasColumnName("refid_nickname")
                    .HasColumnType("varchar(100)");
            });

            modelBuilder.Entity<Login>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("login");

                entity.HasIndex(e => new { e.Username, e.Email })
                    .HasName("username")
                    .IsUnique();

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Centername)
                    .IsRequired()
                    .HasColumnName("centername")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Dateandtime)
                    .HasColumnName("dateandtime")
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'")
                    .ValueGeneratedOnAddOrUpdate();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("text");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasColumnName("role")
                    .HasColumnType("enum('superadmin','adminuser')");

                entity.Property(e => e.Securitykey)
                    .IsRequired()
                    .HasColumnName("securitykey")
                    .HasColumnType("varchar(15)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status")
                    .HasColumnType("enum('Active','Pending','Block')");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasColumnType("varchar(15)");
            });

            modelBuilder.Entity<Meetingalerts>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("meetingalerts");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Alertdate)
                    .IsRequired()
                    .HasColumnName("alertdate")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Custommsg)
                    .IsRequired()
                    .HasColumnName("custommsg")
                    .HasColumnType("text");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Host)
                    .HasColumnName("host")
                    .HasColumnType("int(50)");

                entity.Property(e => e.Meetingid)
                    .HasColumnName("meetingid")
                    .HasColumnType("int(50)");

                entity.Property(e => e.Msg)
                    .IsRequired()
                    .HasColumnName("msg")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Participant)
                    .HasColumnName("participant")
                    .HasColumnType("int(50)");

                entity.Property(e => e.Readstatus)
                    .IsRequired()
                    .HasColumnName("readstatus")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Sentdate)
                    .IsRequired()
                    .HasColumnName("sentdate")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Systemdate)
                    .IsRequired()
                    .HasColumnName("systemdate")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(50)");
            });

            modelBuilder.Entity<Meetings>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("meetings");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Createdstatus)
                    .IsRequired()
                    .HasColumnName("createdstatus")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Eday)
                    .IsRequired()
                    .HasColumnName("eday")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Ehh)
                    .IsRequired()
                    .HasColumnName("ehh")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Emm)
                    .IsRequired()
                    .HasColumnName("emm")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Emonth)
                    .IsRequired()
                    .HasColumnName("emonth")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Eyear)
                    .IsRequired()
                    .HasColumnName("eyear")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Loc)
                    .IsRequired()
                    .HasColumnName("loc")
                    .HasColumnType("text");

                entity.Property(e => e.Notes)
                    .IsRequired()
                    .HasColumnName("notes")
                    .HasColumnType("text");

                entity.Property(e => e.Refid)
                    .IsRequired()
                    .HasColumnName("refid")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Sday)
                    .IsRequired()
                    .HasColumnName("sday")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Shh)
                    .IsRequired()
                    .HasColumnName("shh")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Smm)
                    .IsRequired()
                    .HasColumnName("smm")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Smonth)
                    .IsRequired()
                    .HasColumnName("smonth")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Syear)
                    .IsRequired()
                    .HasColumnName("syear")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasColumnType("text");
            });

            modelBuilder.Entity<Nearbyinvitations>(entity =>
            {
                entity.ToTable("nearbyinvitations");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Accepteddate)
                    .HasColumnName("accepteddate")
                    .HasColumnType("date");

                entity.Property(e => e.Chatdec)
                    .HasColumnName("chatdec")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Custommsg)
                    .HasColumnName("custommsg")
                    .HasColumnType("varchar(500)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Fromid)
                    .HasColumnName("fromid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FromidBlock)
                    .HasColumnName("fromid_block")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.FromidNickname)
                    .HasColumnName("fromid_nickname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Fromstatus)
                    .HasColumnName("fromstatus")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Inviteddate)
                    .HasColumnName("inviteddate")
                    .HasColumnType("date");

                entity.Property(e => e.Readstatud)
                    .HasColumnName("readstatud")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Requestfrom)
                    .HasColumnName("requestfrom")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Requestto)
                    .HasColumnName("requestto")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.ToidBlock)
                    .HasColumnName("toid_block")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.ToidNickname)
                    .HasColumnName("toid_nickname")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Toreadstatus)
                    .HasColumnName("toreadstatus")
                    .HasColumnType("varchar(45)");

                entity.Property(e => e.Touserid)
                    .HasColumnName("touserid")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Newmeetings>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("newmeetings");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("date");

                entity.Property(e => e.Createdstatus)
                    .IsRequired()
                    .HasColumnName("createdstatus")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Date)
                    .IsRequired()
                    .HasColumnName("date")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Duration)
                    .IsRequired()
                    .HasColumnName("duration")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.EventDate)
                    .HasColumnName("event_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Host)
                    .IsRequired()
                    .HasColumnName("host")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Notes)
                    .IsRequired()
                    .HasColumnName("notes")
                    .HasColumnType("text");

                entity.Property(e => e.Participant)
                    .IsRequired()
                    .HasColumnName("participant")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasColumnType("varchar(255)");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(50)");
            });

            modelBuilder.Entity<Profession>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("profession");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Label)
                    .HasColumnName("label")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(200)");
            });

            modelBuilder.Entity<Register>(entity =>
            {
                entity.HasKey(e => e.Guid)
                    .HasName("PRIMARY");

                entity.ToTable("register");

                entity.Property(e => e.Guid)
                    .HasColumnName("guid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Addressshow)
                    .HasColumnName("addressshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Caddress)
                    .HasColumnName("caddress")
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Caddressshow)
                    .HasColumnName("caddressshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Ccode)
                    .HasColumnName("ccode")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Cemail)
                    .HasColumnName("cemail")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Cemailshow)
                    .HasColumnName("cemailshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Cmobile)
                    .HasColumnName("cmobile")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Cmobileshow)
                    .HasColumnName("cmobileshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Cnumber)
                    .HasColumnName("cnumber")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Companyname)
                    .HasColumnName("companyname")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Companynameshow)
                    .HasColumnName("companynameshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Country)
                    .HasColumnName("country")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.CountryCode)
                    .HasColumnName("country_code")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Department)
                    .HasColumnName("department")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Departmentshow)
                    .HasColumnName("departmentshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Deviceid)
                    .HasColumnName("deviceid")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Emailshow)
                    .HasColumnName("emailshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Exten)
                    .HasColumnName("exten")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Extshow)
                    .HasColumnName("extshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Facebook)
                    .HasColumnName("facebook")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Facebookshow)
                    .HasColumnName("facebookshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Fax)
                    .HasColumnName("fax")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Faxshow)
                    .HasColumnName("faxshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Homephone)
                    .HasColumnName("homephone")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Homephoneshow)
                    .HasColumnName("homephoneshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Imageshow)
                    .HasColumnName("imageshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Lastname)
                    .HasColumnName("lastname")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Lastnameshow)
                    .HasColumnName("lastnameshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Lastseen)
                    .HasColumnName("lastseen")
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'")
                    .ValueGeneratedOnAddOrUpdate();

                entity.Property(e => e.Lati)
                    .HasColumnName("lati")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Linkedin)
                    .HasColumnName("linkedin")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Linkedinshow)
                    .HasColumnName("linkedinshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Logo)
                    .HasColumnName("logo")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Logoshow)
                    .HasColumnName("logoshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Longi)
                    .HasColumnName("longi")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Membership)
                    .HasColumnName("membership")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Mobile)
                    .IsRequired()
                    .HasColumnName("mobile")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Mobilenumbershow)
                    .HasColumnName("mobilenumbershow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Mycode)
                    .HasColumnName("mycode")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Nameshow)
                    .HasColumnName("nameshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Otp)
                    .HasColumnName("otp")
                    .HasColumnType("varchar(10)");

                entity.Property(e => e.Points)
                    .HasColumnName("points")
                    .HasColumnType("int(100)");

                entity.Property(e => e.Profession)
                    .HasColumnName("profession")
                    .HasColumnType("varchar(500)");

                entity.Property(e => e.Referalcode)
                    .HasColumnName("referalcode")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Regid)
                    .HasColumnName("regid")
                    .HasColumnType("text");

                entity.Property(e => e.Skype)
                    .HasColumnName("skype")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Skypeshow)
                    .HasColumnName("skypeshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Theme)
                    .IsRequired()
                    .HasColumnName("theme")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Timezone)
                    .HasColumnName("timezone")
                    .HasColumnType("varchar(200)");

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Titleshow)
                    .HasColumnName("titleshow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Twitter)
                    .HasColumnName("twitter")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Twittershow)
                    .HasColumnName("twittershow")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Website)
                    .HasColumnName("website")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Websiteshow)
                    .HasColumnName("websiteshow")
                    .HasColumnType("varchar(250)");
            });

            modelBuilder.Entity<Usercardelements>(entity =>
            {
                entity.ToTable("usercardelements");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.ElementId).HasColumnType("int(11)");

                entity.Property(e => e.FontColor).HasColumnType("varchar(45)");

                entity.Property(e => e.FontSize).HasColumnType("int(11)");

                entity.Property(e => e.FontWeight).HasColumnType("varchar(45)");

                entity.Property(e => e.Height).HasColumnType("int(11)");

                entity.Property(e => e.IconImagePostiion).HasColumnType("char(1)");

                entity.Property(e => e.IsHidden).HasColumnType("bit(1)");

                entity.Property(e => e.PositionX).HasColumnType("int(11)");

                entity.Property(e => e.PositionY).HasColumnType("int(11)");

                entity.Property(e => e.UserId).HasColumnType("int(11)");

                entity.Property(e => e.Width).HasColumnType("int(11)");
            });

            modelBuilder.Entity<Userchannels>(entity =>
            {
                entity.HasKey(e => new { e.Userid, e.Channelid })
                    .HasName("PRIMARY");

                entity.ToTable("userchannels");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Channelid)
                    .HasColumnName("channelid")
                    .HasColumnType("int(11)");
            });

            modelBuilder.Entity<Usermessages>(entity =>
            {
                entity.HasKey(e => new { e.Userid, e.Messageid })
                    .HasName("PRIMARY");

                entity.ToTable("usermessages");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Messageid)
                    .HasColumnName("messageid")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.Isread)
                    .HasColumnName("isread")
                    .HasColumnType("bit(1)");
            });
        }
    }
}
