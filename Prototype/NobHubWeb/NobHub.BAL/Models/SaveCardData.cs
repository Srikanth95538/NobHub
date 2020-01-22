using NobHub.Common;
using NobHub.DAL.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace NobHub.BAL.Models
{
    public class SaveCardData
    {
        nobhubtestContext _context;
        public SaveCardData()
        {
            _context = new nobhubtestContext();
        }
        public void SaveData(CardElementsTbl _details)
        {
            try
            {
                // var carddetails = _context.CardsLookup.SingleOrDefault(i => i.CardId == _details.CardId);
                //if(carddetails!=null)
                //{
                //    carddetails.Height = Convert.ToInt32(_details.ParentHeight);
                //    carddetails.Width = Convert.ToInt32(_details.ParentWidth);
                //    carddetails.Borderradious = _details.Borderradious;
                //}



                // var _CardElementGroupId = GetCardElementId(_details.CardElementgroup);
                //var details = _context.Cardelements.SingleOrDefault(i => i.CardElementId == _CardElementGroupId
                //&& i.CardId == _details.CardId && i.Cardlementtagname == _details.Cardlementtagname);

                var details = _context.Cardelements.SingleOrDefault(i => i.ElementgroupId == _details.ElementgroupId
                             && i.Cardlementtagname == _details.Cardlementtagname);

                if (details != null)
                {
                    details.PositionX = _details.PositionX;
                    details.PositionY = _details.PositionY;
                    details.Height = _details.Height;
                    details.Width = _details.Width;
                    details.FontColor = _details.FontColor;
                    details.FontWeight = _details.FontWeight;
                    details.FontSize = _details.FontSize;
                    details.Elementlineheight = _details.Elementlineheight;
                    details.IconImagePostiion = _details.IconImagePostiion;
                    details.IconImageId = _details.IconImageId;
                }
                else
                {
                    Cardelements _tblcardelements = new Cardelements();
                    _tblcardelements.Cardlementtagname = _details.Cardlementtagname;
                    _tblcardelements.CardArea = _details.CardArea;
                    _tblcardelements.CardId = _details.CardId;
                    _tblcardelements.ElementgroupId = _details.ElementgroupId;
                    _tblcardelements.PositionX = _details.PositionX;
                    _tblcardelements.PositionY = _details.PositionY;
                    _tblcardelements.Height = _details.Height;
                    _tblcardelements.Width = _details.Width;
                    _tblcardelements.FontColor = _details.FontColor;
                    _tblcardelements.FontWeight = _details.FontWeight;
                    _tblcardelements.FontSize = _details.FontSize;
                    _tblcardelements.CardArea = _details.CardArea;
                    _tblcardelements.Elementlineheight = _details.Elementlineheight;
                    _tblcardelements.IconImagePostiion = _details.IconImagePostiion;
                    _tblcardelements.IconImageId = _details.IconImageId;
                    _context.Add(_tblcardelements);
                }

                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public BusinessCard SaveBusinessCard(BusinessCard card)
        {
            try
            {
                var tempStr = card.Cardfrontfile;

                if (tempStr.Split("_").Length > 2)
                {
                    card.Cardfrontfile = tempStr.Split("_")[2];
                }

                tempStr = card.Cardbackfile;

                if (tempStr.Split("_").Length > 2)
                {
                    card.Cardbackfile = tempStr.Split("_")[2];
                }

                if (card.CardId == 0)
                {
                    var newCard = new BusinessCards
                    {
                        Cardname = card.Cardname,
                        Borderradius = card.Borderradius,
                        Cardfrontfile = card.Cardfrontfile,
                        Cardbackfile = card.Cardbackfile,
                        Cardshape = card.Cardshape,
                        Ispublished = card.Ispublished,
                        Category = card.Category,
                        Createdby = 0,
                        Createddate = DateTime.Now,
                        Usercount = 0,
                        Isdefault = card.IsDefault,
                        Statictext = card.StaticText,
                        Staticimage = card.staticimageFile
                    };

                    _context.BusinessCards.Add(newCard);
                    _context.SaveChanges();
                    card.CardId = newCard.CardId;
                }
                else
                {
                    var dbCard = _context.BusinessCards.Where(i => i.CardId == card.CardId).FirstOrDefault();

                    if (dbCard != null)
                    {
                        dbCard.Cardname = card.Cardname;
                        dbCard.Borderradius = card.Borderradius;
                        dbCard.Cardfrontfile = card.Cardfrontfile;
                        dbCard.Cardbackfile = card.Cardbackfile;
                        dbCard.Cardshape = card.Cardshape;
                        dbCard.Ispublished = card.Ispublished;
                        dbCard.Category = card.Category;
                        dbCard.Updatedby = 0;
                        dbCard.Updateddate = DateTime.Now;
                        dbCard.Statictext = card.StaticText;
                        dbCard.Staticimage = card.staticimageFile;


                        _context.SaveChanges();
                    }
                }

                foreach (var ele in card.Elements)
                {
                    if (ele.Id == 0)
                    {
                        var newEle = new Cardelements
                        {
                            CardId = card.CardId,
                            CardArea = ele.CardArea,
                            ElementgroupId = ele.ElementgroupId,
                            Cardlementtagname = ele.Cardlementtagname,
                            Height = ele.Height,
                            Width = ele.Width,
                            PositionX = ele.PositionX,
                            PositionY = ele.PositionY,
                            FontColor = ele.FontColor,
                            FontSize = ele.FontSize,
                            FontWeight = ele.FontWeight,
                            IconImageId = ele.IconImageId,
                            IconImagePostiion = ele.IconImagePostiion,
                            TextHorizontal = ele.TextHorizontal,
                            TextVertical = ele.TextVertical,
                            Elementlineheight = ele.Elementlineheight,
                            IconImageUrl = ele.IconImageUrl,
                            Cardelementtext = ele.Cardelementtext
                        };

                        _context.Cardelements.Add(newEle);
                        _context.SaveChanges();
                        ele.Id = newEle.Id;
                    }
                    else
                    {
                        var dbEle = _context.Cardelements.Where(i => i.Id == ele.Id).FirstOrDefault();
                        if (dbEle != null)
                        {
                            dbEle.CardArea = ele.CardArea;
                            dbEle.ElementgroupId = ele.ElementgroupId;
                            dbEle.Cardlementtagname = ele.Cardlementtagname;
                            dbEle.Height = ele.Height;
                            dbEle.Width = ele.Width;
                            dbEle.PositionX = ele.PositionX;
                            dbEle.PositionY = ele.PositionY;
                            dbEle.FontColor = ele.FontColor;
                            dbEle.FontSize = ele.FontSize;
                            dbEle.FontWeight = ele.FontWeight;
                            dbEle.IconImageId = ele.IconImageId;
                            dbEle.IconImagePostiion = ele.IconImagePostiion;
                            dbEle.TextHorizontal = ele.TextHorizontal;
                            dbEle.TextVertical = ele.TextVertical;
                            dbEle.Elementlineheight = ele.Elementlineheight;
                            dbEle.IconImageUrl = ele.IconImageUrl;
                            dbEle.Cardelementtext = ele.Cardelementtext;

                            _context.SaveChanges();
                        }
                    }
                }
                return card;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteCardElementData(int elementId)
        {
            try
            {
                var details = _context.Cardelements.FirstOrDefault(i => i.Id == elementId);

                if (details != null)
                {
                    _context.Cardelements.Remove(details);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int GetCardElementId(string _elename)
        {
            CardelementgroupsLookup _cgl = new CardelementgroupsLookup();
            _cgl.CardelementId = _context.CardelementgroupsLookup.First(a => a.Cardelementname == _elename).CardelementId;
            return _cgl.CardelementId;
        }
        public List<CardElement> GetCardElementData(int CardId)
        {
            try
            {
                var elements = (from e in _context.Cardelements.Where(i => i.CardId == CardId)
                                from grp in _context.Cardelementtypes.Where(i => i.ElementtypeId == e.ElementgroupId)
                                from ic in _context.CardiconsLookup.Where(i => e.IconImageId == i.Cardiconid).DefaultIfEmpty()

                                select new CardElement
                                {
                                    Id = e.Id,
                                    CardArea = e.CardArea,
                                    ElementgroupId = e.ElementgroupId,
                                    Cardlementtagname = e.Cardlementtagname,
                                    Height = e.Height,
                                    Width = e.Width,
                                    PositionX = e.PositionX,
                                    PositionY = e.PositionY,
                                    FontColor = e.FontColor,
                                    FontSize = e.FontSize,
                                    FontWeight = e.FontWeight,
                                    IconImageId = e.IconImageId,
                                    IconImagePostiion = e.IconImagePostiion,
                                    TextHorizontal = e.TextHorizontal,
                                    TextVertical = e.TextVertical,
                                    Elementlineheight = e.Elementlineheight,
                                    IconImageUrl = e.IconImageUrl,
                                    Cardelementtext = e.Cardelementtext,
                                    Iconfile = ic.Iconfile,
                                    ElementTypeName = grp.Elementtypename
                                }).ToList();

                return elements;

            }
            catch (Exception ex)
            {


                throw ex;
            }

        }
        public List<Lookup> GetCardElementGroups()
        {
            try
            {
                return (from e in _context.Cardelementtypes
                        select new Lookup
                        {
                            value = e.ElementtypeId.ToString(),
                            text = e.Elementtypename
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public List<CardsLookup> GetActiveCards()
        {
            List<CardsLookup> _details = new List<CardsLookup>();
            try
            {
                _details = (from e in _context.CardsLookup select e).ToList();
                return _details;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public Nobhubsettings GetNobhubSettings()
        //{
        //    try
        //    {
        //        return _context.Nobhubsettings.FirstOrDefault();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        public BusinessCard GetActiveCarddetaillsById(int cardid)
        {
            try
            {               
                var _card = (from e in _context.BusinessCards.Where(i => i.CardId == cardid)
                             select new BusinessCard
                             {
                                 CardId = e.CardId,
                                 Cardname = e.Cardname,
                                 Borderradius = e.Borderradius,
                                 Cardfrontfile = Convert.ToString(e.CardId) + "_F_" + e.Cardfrontfile,
                                 Cardbackfile = Convert.ToString(e.CardId) + "_B_" + e.Cardbackfile,
                                 Cardshape = e.Cardshape,
                                 Ispublished = e.Ispublished,
                                 Category = e.Category
                             }).FirstOrDefault();

                if (_card != null)
                {
                    _card.Elements = (from e in _context.Cardelements.Where(i => i.CardId == cardid)
                                      from grp in _context.Cardelementtypes.Where(i => i.ElementtypeId == e.ElementgroupId)
                                      from ic in _context.CardiconsLookup.Where(i => e.IconImageId == i.Cardiconid).DefaultIfEmpty()

                                      select new CardElement
                                      {
                                          Id = e.Id,
                                          CardArea = e.CardArea,
                                          ElementgroupId = e.ElementgroupId,
                                          Cardlementtagname = e.Cardlementtagname,
                                          Height = e.Height,
                                          Width = e.Width,
                                          PositionX = e.PositionX,
                                          PositionY = e.PositionY,
                                          FontColor = e.FontColor,
                                          FontSize = e.FontSize,
                                          FontWeight = e.FontWeight,
                                          IconImageId = e.IconImageId,
                                          IconImagePostiion = e.IconImagePostiion,
                                          TextHorizontal = e.TextHorizontal,
                                          TextVertical = e.TextVertical,
                                          Elementlineheight = e.Elementlineheight,
                                          IconImageUrl = e.IconImageUrl,
                                          Cardelementtext = e.Cardelementtext,
                                          Iconfile = ic.Iconfile,
                                          ElementTypeName = grp.Elementtypename
                                      }).ToList();
                }

                return _card;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateCardDimensions(CardsLookup _details)
        {
            try
            {
                var details = _context.CardsLookup.SingleOrDefault(i => i.CardId == _details.CardId);

                if (details != null)
                {
                    details.CardId = _details.CardId;
                    details.Height = _details.Height;
                    details.Width = _details.Width;
                    details.Borderradious = _details.Borderradious;

                }


                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Used to  map user data into card element data to display.
        /// </summary>
        /// <param name="userid">Unique id of User in register</param>
        /// <returns></returns>
        public List<cardelementwithimage> GetUserDefaultCardById(int userid)
        {
            List<cardelementwithimage> _CardImgdetails = new List<cardelementwithimage>();
            List<CardElement> _Carddetails = new List<CardElement>();

            var _users = new List<Register>();
            try
            {
                _users = (from u in _context.Register.Where(u => u.Guid == userid) select u).ToList();

                if (_users.Count > 0)
                {
                    var cardid = int.Parse(_users[0].Theme);
                    //var cardid = "123";
                    _Carddetails = (from e in _context.Cardelements
                                    join u in _context.Usercardelements
                                    on e.Id equals u.ElementId into l
                                    from j in l.DefaultIfEmpty()
                                    where e.CardId == cardid
                                    select new CardElement
                                    {
                                        PositionX = (int)(j.PositionX == null ? e.PositionX : j.PositionX),
                                        PositionY = (int)(j.PositionY == null ? e.PositionY : j.PositionY),
                                        Id = e.Id,
                                        ElementTypeName = e.Cardlementtagname,
                                        CardArea = e.CardArea,
                                        ElementgroupId = e.ElementgroupId,
                                        Height = (int)(j.Height == null ? e.Height : j.Height),
                                        Width = (int)(j.Width == null ? e.Width : j.Width),
                                        FontWeight = (j.FontWeight == null ? e.FontWeight : j.FontWeight),
                                        FontColor = (j.FontColor == null ? e.FontColor : j.FontColor),
                                        FontSize = (j.FontSize == null ? e.FontSize : j.FontSize),
                                        Cardelementtext = e.Cardelementtext,
                                        Elementlineheight = e.Elementlineheight,
                                        IconImageId = e.IconImageId,
                                        IconImagePostiion = e.IconImagePostiion,
                                        TextVertical = e.TextVertical,
                                        TextHorizontal = e.TextHorizontal
                                    }).ToList();



                    //_Carddetails = (from e in _context.Cardelements.Where(e => e.CardId == cardid) select e).OrderBy(e => e.PositionY).ToList();

                    _CardImgdetails = MapCardElementiWithUserDetails(_users[0], _CardImgdetails, _Carddetails);
                }
                _users = null;
                return _CardImgdetails;

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        private List<cardelementwithimage> MapCardElementiWithUserDetails(Register user, List<cardelementwithimage> _CardImgdetails, List<CardElement> _Carddetails)

        {

            for (var i = 0; i < _Carddetails.Count; i++)
            {
                var cardEle = _Carddetails[i];

                if (cardEle.ElementgroupId == 1)
                {
                    cardEle.Cardelementtext = user.Name + "," + user.Lastname;
                }
                else if (cardEle.ElementgroupId == 10)
                {
                    cardEle.Cardelementtext = user.Caddress;
                }
                else if (cardEle.ElementgroupId == 11)
                {
                    cardEle.Cardelementtext = user.Cmobile;
                }
                else if (cardEle.ElementgroupId == 13)
                {
                    cardEle.Cardelementtext = user.Fax;
                }
                else if (cardEle.ElementgroupId == 14)
                {
                    cardEle.Cardelementtext = user.Logo;
                }
                else if (cardEle.ElementgroupId == 15)
                {
                    cardEle.Cardelementtext = user.Profession;
                }
                else if (cardEle.ElementgroupId == 2)
                {
                    cardEle.Cardelementtext = user.Email;
                }
                else if (cardEle.ElementgroupId == 3)
                {
                    cardEle.Cardelementtext = user.Mobile;
                }
                else if (cardEle.ElementgroupId == 4)
                {
                    cardEle.Cardelementtext = user.Address;
                }
                else if (cardEle.ElementgroupId == 5)
                {
                    cardEle.Cardelementtext = user.Companyname;
                }
                else if (cardEle.ElementgroupId == 6)
                {
                    cardEle.Cardelementtext = user.Title;
                }
                else if (cardEle.ElementgroupId == 7)
                {
                    cardEle.Cardelementtext = user.Department;
                }
                else if (cardEle.ElementgroupId == 8)
                {
                    cardEle.Cardelementtext = user.Cemail;
                }
                else if (cardEle.ElementgroupId == 9)
                {
                    cardEle.Cardelementtext = user.Website;
                }
                else if (cardEle.ElementgroupId == 16)
                {
                    cardEle.Cardelementtext = user.Image;
                }

                var _x = new cardelementwithimage();
                _x.CardelElements = cardEle;

                var IconFile = GetIconFileName(cardEle.IconImageId);
                _x.CardiconsLookup = IconFile;



                if (cardEle.ElementgroupId == 14 || cardEle.ElementgroupId == 99)
                {
                    // pass cardEle.Id and get image data;
                    var _img = GetImageBase64data(cardEle.Id);
                    if (_img != null)
                    {
                        _x.Cardelementimages = _img;

                    }

                }
                _CardImgdetails.Add(_x);
            }

            return _CardImgdetails;
        }

        public void SaveImageData(string imgBase64String)
        {
            try
            {
                Cardelementimages _image = new Cardelementimages();
                _image.Cardelementid = 1;
                _image.Imagedata = imgBase64String;
                _context.Add(_image);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Cardelementimages GetImageBase64data(int? CardElementId)
        {
            Cardelementimages _imageData = new Cardelementimages();
            try
            {
                _imageData = (from e in _context.Cardelementimages where e.Cardelementid == CardElementId select e).FirstOrDefault();
                return _imageData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public CardiconsLookup GetIconFileName(int? CardElementId)
        {
            CardiconsLookup _iconFileName = new CardiconsLookup();
            try
            {
                _iconFileName = (from e in _context.CardiconsLookup where e.Cardiconid == CardElementId select e).FirstOrDefault();
                return _iconFileName;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string GetImageBase64dataString(int? CardElementId)
        {
            //Cardelementimages _imageData = new Cardelementimages();
            try
            {
                var _imageData = (from e in _context.Cardelementimages where e.Cardelementid == CardElementId select e.Imagedata).FirstOrDefault();
                return _imageData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public CardsFiles GetUserCardbyUserId(int userid)
        {



            var _users = new List<Register>();
            var _CardsFiles = new CardsFiles();

            try
            {
                _users = (from u in _context.Register.Where(u => u.Guid == userid) select u).ToList();

                if (_users.Count > 0)
                {
                    var cardid = 1;
                    var _Carddetails = (from e in _context.CardsLookup.Where(e => e.CardId == cardid) select e).FirstOrDefault();

                    if (_Carddetails != null)
                    {
                        _CardsFiles.CardFrontPath = _Carddetails.Cardname; //_Carddetails.Cardfrontfile;
                        _CardsFiles.CardBackPath = _Carddetails.Cardnameback; //_Carddetails.Cardbackfile;
                    }

                }
                _users = null;
                return _CardsFiles;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public int insertCard(int width, int height, int borderRadious)
        {
            var _card = new CardsLookup();
            _card.Width = width;
            _card.Height = height;
            _card.Borderradious = borderRadious;
            _card.Cardname = "newcard";
            _card.Cardnameback = "newcardback";

            _context.CardsLookup.Add(_card);
            _context.SaveChanges();
            return _card.CardId;


        }

        public Boolean UpdateCarddetailsAfterInsert(CardsLookup card)
        {
            var _success = false;
            try
            {
                var _card = _context.CardsLookup.SingleOrDefault(i => i.CardId == card.CardId);
                if (_card != null)
                {
                    _card.Cardname = card.Cardname;
                    _card.Cardnameback = card.Cardnameback;
                    _card.Cardfrontfile = card.Cardfrontfile;
                    _card.Cardbackfile = card.Cardbackfile;


                }
                else
                {
                    //This should never happen
                    _context.CardsLookup.Add(card);

                }


                _context.SaveChanges();

                _success = true;
            }
            catch (Exception) { }



            return _success;
        }

        public List<ElementIconsLookup> GetIconNames()
        {
            try
            {
                return (from e in _context.CardiconsLookup
                        select new ElementIconsLookup
                        {
                            Id = e.Cardiconid,
                            IconName = e.Iconname,
                            IconFile = e.Iconfile
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void InsertIconData(string IconName, string IconFile, string IconType)
        {
            try
            {
                CardiconsLookup _icons = new CardiconsLookup();
                _icons.Iconname = IconName;
                _icons.Iconfile = IconFile;
                _icons.Iconfiletype = IconType;
                _context.Add(_icons);
                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void UpdateCardThemeforUser(string Theme, int UserId)
        {
            try
            {
                var _userdetails = _context.Register.SingleOrDefault(i => i.Guid == UserId);
                if (_userdetails != null)
                {
                    _userdetails.Theme = Theme;
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Register> GetYesProfiles(int UserId)
        {
            List<Register> _details = new List<Register>();
            try
            {
                var _Invitedetails = (from i in _context.Invites
                                      where (i.Refid == UserId.ToString() ||
     i.Cid == UserId.ToString()) && i.Fromstatus == "accepted"
                                      select i).ToList();

                foreach (var item in _Invitedetails)
                {
                    if (item.Refid == UserId.ToString())
                    {
                        _details.Add((from r in _context.Register where r.Guid.ToString() == item.Cid select r).FirstOrDefault());
                    }
                    else if (item.Cid == UserId.ToString())
                    {
                        _details.Add((from r in _context.Register where r.Guid.ToString() == item.Refid select r).FirstOrDefault());
                    }
                }


                //_details = (from e in _context.Invites
                //            join r in _context.Register on e.Refid equals r.Guid.ToString()
                //            where // (e.Cid == UserId.ToString() && e.Fromstatus == "accepted") || 
                //           ( e.Refid == UserId.ToString()
                //            && e.Fromstatus == "accepted")
                //            select r ).ToList();
                //if(_list!=null)
                //{
                //    for(int i=0;i<_list.Count;i++)
                //    {
                //        _details.Add((from e in _context.Register where e.Guid.ToString() == _list[i].Refid select e).FirstOrDefault());


                //    }
                //}
                return _details;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Userdetails> GetNearByProfiles(int UserId, string Lat, string Lang, char Dist_Unit)
        {
            var strUserID = Convert.ToString(UserId);
            double double_Lat = Convert.ToDouble(Lat);
            double double_Lang = Convert.ToDouble(Lang);
            List<Userdetails> _nearbydetails = new List<Userdetails>();
            try
            {

                var _removedIDstg = (from i in _context.Invites where i.Cid == UserId.ToString() && i.Fromstatus == "accepted" select i.Refid
                                ).Union(from i in _context.Invites where i.Refid == UserId.ToString() && i.Fromstatus == "accepted" select  i.Cid).ToList();

                var _removedIDints = _removedIDstg.Select(int.Parse).ToList();

                var finalIDs = _context.Register
                        .Select(e => e.Guid)
                        //.Except(_removedIDints).ToList();
                        .Where(f => !_removedIDints.Contains(f)).ToList();


               var _details = (from e in _context.Register 
                                  //join u in finalIDs on e.Guid equals u
                                  where e.Guid != UserId && e.Status == "Verified"
                                 
                                  orderby e.Name ascending
                                  select new Userdetails
                                  {
                                      Name = e.Name ,
                                      LastName =e.Lastname,
                                      Userid = e.Guid,
                                      Department = e.Department,
                                      Companyname = e.Companyname,
                                      Title = e.Title,
                                      Lati = e.Lati,
                                      Longi = e.Longi,
                                      UserAddress = e.Address,
                                      Profession = e.Profession,
                                      Image = e.Image,
                                      //Status = GetStatus(UserId, e.Guid),
                                      // Distance = DistanceCal.distance(double_Lat, double_Lang, Convert.ToDouble(e.Lati), Convert.ToDouble(e.Longi), Dist_Unit)
                                  }).ToList();

                foreach (var item in _details)
                {
                    if (finalIDs.Any(x=>x==item.Userid))
                    {
                        Userdetails dat = new Userdetails();
                        dat.Name = item.Name;
                        dat.LastName = item.LastName;
                        dat.Userid = item.Userid;
                        dat.Department = item.Department;
                        dat.Companyname = item.Companyname;
                        dat.Title = item.Title;
                        dat.Lati = item.Lati;
                        dat.Longi = item.Longi;
                        dat.UserAddress = item.UserAddress;
                        dat.Profession = item.Profession;
                        dat.Image = item.Image;
                        dat.Status = GetStatus(UserId, item.Userid);
                        if (!string.IsNullOrEmpty(item.Lati) && !string.IsNullOrEmpty(item.Longi))
                        {
                            dat.Distance = DistanceCal.distance(double_Lat, double_Lang, Convert.ToDouble(item.Lati), Convert.ToDouble(item.Longi), Dist_Unit);

                        }
                        //else { dat.Distance = DistanceCal.distance(double_Lat, double_Lang, Convert.ToDouble(item.Lati), Convert.ToDouble(item.Longi), Dist_Unit); }

                        _nearbydetails.Add(dat);
                    }
                   
                }
                return _nearbydetails;

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
        public string GetStatus(int UserId, int CuserId)
        {
            string Status = string.Empty;
            //using (var context = new nobhubtestContext())
            //{


                var _data = (from e in _context.Invites
                             where (e.Refid == UserId.ToString() && e.Cid == CuserId.ToString()
                             || e.Refid == CuserId.ToString() && e.Cid == UserId.ToString())
                             select e).FirstOrDefault();
                if (_data != null)
                {
                    if (_data.Fromstatus == "accepted")
                    {
                        Status = "CONNECTED";
                    }
                    if (_data.Fromstatus == "pending" || _data.Fromstatus == "blocked")
                    {
                        if (_data.Refid == UserId.ToString())
                        {
                            Status = "INVITATION SENT";
                        }
                        else
                        {
                            Status = "REQUEST PENDING";
                        }
                    }
                    if (_data.Fromstatus == "rejected")
                    {
                        Status = "REQUEST REJECTED";
                    }
                }

            //}
            return Status;
        }
        public List<CardCategories> GetAllCategories()
        {
            try
            {
                return (from e in _context.CardsCategories
                        select new CardCategories
                        {
                            categorieID = e.Guid,
                            categorieName = e.Name,
                            Image = Convert.ToString(e.Guid) + "_" + e.Image,
                            Date = e.Date
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<BusinessCard> GetPublishedCards()
        {
            List<BusinessCards> _details = new List<BusinessCards>();
            try
            {
                return (from e in _context.BusinessCards.Where(i => i.Ispublished == true)
                        from c in _context.CardsCategories.Where(c => c.Guid == e.Category).DefaultIfEmpty()
                        select new BusinessCard
                        {
                            CardId = e.CardId,
                            Cardname = e.Cardname,
                            Category = e.Category,
                            Cardshape = e.Cardshape,
                            Borderradius = e.Borderradius,
                            Cardfrontfile = Convert.ToString(e.CardId) + "_F_" + e.Cardfrontfile,
                            Cardbackfile = Convert.ToString(e.CardId) + "_B_" + e.Cardbackfile,
                            CategoryName = c.Name,
                            Createddate = e.Createddate,
                            UserCount = e.Usercount,
                            IsDefault = e.Isdefault,
                            Ispublished = e.Ispublished,
                            IscameFrom = "PublishedCards"
                        }
                            ).OrderByDescending(e => e.Createddate).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<BusinessCard> GetDefaultCards()
        {
            List<BusinessCards> _details = new List<BusinessCards>();
            try
            {
                return (from e in _context.BusinessCards.Where(i => i.Isdefault == true)
                        from c in _context.CardsCategories.Where(c => c.Guid == e.Category).DefaultIfEmpty()
                        select new BusinessCard
                        {
                            CardId = e.CardId,
                            Cardname = e.Cardname,
                            Category = e.Category,
                            Cardshape = e.Cardshape,
                            Borderradius = e.Borderradius,
                            Cardfrontfile = Convert.ToString(e.CardId) + "_F_" + e.Cardfrontfile,
                            Cardbackfile = Convert.ToString(e.CardId) + "_B_" + e.Cardbackfile,
                            CategoryName = c.Name,
                            Createddate = e.Createddate,
                            UserCount = e.Usercount,
                            IsDefault = e.Isdefault,
                            Ispublished = e.Ispublished,
                            IscameFrom = "defaultCards"
                        }
                            ).OrderByDescending(e => e.Createddate).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<BusinessCard> GetPendingCards()
        {
            List<BusinessCards> _details = new List<BusinessCards>();
            try
            {
                return (from e in _context.BusinessCards.Where(i => i.Ispublished == false && i.Isdefault == false)
                        from c in _context.CardsCategories.Where(c => c.Guid == e.Category).DefaultIfEmpty()
                        select new BusinessCard
                        {
                            CardId = e.CardId,
                            Cardname = e.Cardname,
                            Category = e.Category,
                            Cardshape = e.Cardshape,
                            Borderradius = e.Borderradius,
                            Cardfrontfile = Convert.ToString(e.CardId) + "_F_" + e.Cardfrontfile,
                            Cardbackfile = Convert.ToString(e.CardId) + "_B_" + e.Cardbackfile,
                            CategoryName = c.Name,
                            Createddate = e.Createddate,
                            UserCount = e.Usercount,
                            IsDefault = e.Isdefault,
                            IscameFrom = "PendingCards"
                        }
                            ).OrderByDescending(e => e.Createddate).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ViewCardForUser> ViewCardForUser(int UserId)
        {
            try
            {

                return (from r in _context.Register
                        join b in _context.BusinessCards on r.Theme equals b.CardId.ToString()
                        join i in _context.Invites on r.Guid.ToString() equals i.Refid
                        where r.Guid == UserId
                        select new ViewCardForUser
                        {
                            Name = r.Name,
                            LName = r.Lastname,
                            Nickname = i.RefidNickname
                        }).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void UpdateUserNickName(int RefId, string NickName)
        {
            try
            {
                var _details = (from i in _context.Invites where i.Refid == RefId.ToString() select i).FirstOrDefault();
                if (_details != null)
                {
                    _details.RefidNickname = NickName;
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void UpdateElementDimensions(UpdateElementDimensions _newDimensions)
        {
            try
            {
                var _details = (from u in _context.Usercardelements where u.ElementId == _newDimensions.ElementId select u).FirstOrDefault();
                if (_details != null)
                {
                    _details.PositionY = _newDimensions.PositionY;
                    _details.PositionX = _newDimensions.PositionX;
                    _details.FontColor = _newDimensions.FontColor;
                    _details.FontSize = _newDimensions.FontSize;
                }
                else
                {
                    Usercardelements _elements = new Usercardelements();
                    _elements.UserId = _newDimensions.UserId;
                    _elements.ElementId = _newDimensions.ElementId;
                    _elements.FontSize = _newDimensions.FontSize;
                    _elements.PositionX = _newDimensions.PositionX;
                    _elements.PositionY = _newDimensions.PositionY;
                    _elements.FontColor = _newDimensions.FontColor;
                    _context.Add(_elements);
                }
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<BusinessCard> CardsFiltering(int? CategoryId, string CardName, string ISCameFrom)
        {
            try
            {
                bool isPublished = false;
                if (ISCameFrom == " - Pending Cards")
                {
                    isPublished = false;
                }
                else if (ISCameFrom == " - Published Cards")
                {
                    isPublished = true;
                }
                return (
                      from e in _context.BusinessCards.Where(i => (i.Ispublished == isPublished && i.Isdefault == false) && (CategoryId == 0 || i.Category == CategoryId) &&
                      (CardName == null || i.Cardname.ToLower().Contains(CardName.ToLower())))
                      from c in _context.CardsCategories.Where(c => c.Guid == e.Category).DefaultIfEmpty()
                      select new BusinessCard
                      {
                          CardId = e.CardId,
                          Cardname = e.Cardname,
                          Category = e.Category,
                          Cardshape = e.Cardshape,
                          Borderradius = e.Borderradius,
                          Cardfrontfile = Convert.ToString(e.CardId) + "_F_" + e.Cardfrontfile,
                          Cardbackfile = Convert.ToString(e.CardId) + "_B_" + e.Cardbackfile,
                          CategoryName = c.Name,
                          Createddate = e.Createddate,
                          UserCount = e.Usercount,
                          IsDefault = e.Isdefault,
                          Ispublished = e.Ispublished
                      }
                              ).OrderByDescending(e => e.Createddate).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool PublisheCardById(int CardId)
        {
            try
            {
                var data = (from e in _context.BusinessCards.Where(i => i.CardId == CardId) select e).FirstOrDefault();
                if (data != null)

                    data.Ispublished = true;
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool DeleteCardById(int CardId)
        {
            try
            {
                var deleteCard = (from e in _context.BusinessCards.Where(i => i.CardId == CardId) select e).FirstOrDefault();
                if (deleteCard != null)
                    _context.BusinessCards.Remove(deleteCard);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<BusinessCards> GetCardsByCategoryId(int CategoryId)
        {
            try
            {
                return (from e in _context.BusinessCards
                        where e.Category == CategoryId
                        select new BusinessCards
                        {
                            CardId = e.CardId,
                            Cardfrontfile = Convert.ToString(e.CardId) + "_F_" + e.Cardfrontfile,
                            Cardbackfile = Convert.ToString(e.CardId) + "_B_" + e.Cardbackfile,
                            Cardshape = e.Cardshape,
                            Cardname = e.Cardname,
                            Borderradius = e.Borderradius
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Professions> GetAllProfessions()
        {
            try
            {
                return (from e in _context.Profession
                        select new Professions
                        {
                            Id = e.Guid,
                            Name = e.Name,
                            Date = e.Date
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<cardicons> GetAllIcons()
        {
            try
            {
                return (from e in _context.CardiconsLookup
                        select new cardicons
                        {
                            iconId = e.Cardiconid,
                            iconName = e.Iconname,
                            iconFileName = e.Iconfile
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<RegisteredUsers> GetRegisteredUsers()
        {
            try
            {
                return (from r in _context.Register
                        from b in _context.BusinessCards.Where(b => b.CardId.ToString() == r.Theme).DefaultIfEmpty()
                        select new RegisteredUsers
                        {
                            Guid = r.Guid,
                            Name = r.Name,
                            CountryCode = r.CountryCode,
                            Mobile = r.Mobile,
                            Status = r.Status,
                            Date = r.Date,
                            Deviceid = r.Deviceid,
                            Email = r.Email,
                            Address = r.Address,
                            Facebook = r.Address,
                            Twitter = r.Twitter,
                            Skype = r.Skype,
                            Linkedin = r.Skype,
                            Image = r.Image,
                            Lastname = r.Lastname,
                            Homephone = r.Homephone,
                            Companyname = r.Companyname,
                            Title = r.Title,
                            Department = r.Department,
                            Cemail = r.Cemail,
                            Caddress = r.Caddress,
                            Cmobile = r.Cmobile,
                            Profession = r.Profession,
                            Theme = r.Theme,
                            Referalcode = r.Referalcode,
                            Country = r.Country,
                            CardFrontFile = Convert.ToString(b.CardId) + "_F_" + b.Cardfrontfile,
                            CardBackFile = Convert.ToString(b.CardId) + "_B_" + b.Cardbackfile
                        }).ToList();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public List<RegisteredUsers> UsersFiltering(String nameOrcontactORemail)
        {
            return (from r in _context.Register.Where(i => (nameOrcontactORemail == null || i.Name.ToLower().Contains(nameOrcontactORemail.ToLower())
                    || i.Email.ToLower().Contains(nameOrcontactORemail.ToLower()) || i.Mobile.Contains(nameOrcontactORemail)))
                    from b in _context.BusinessCards.Where(b => b.CardId.ToString() == r.Theme).DefaultIfEmpty()
                    select new RegisteredUsers
                    {
                        Guid = r.Guid,
                        Name = r.Name,
                        CountryCode = r.CountryCode,
                        Mobile = r.Mobile,
                        Status = r.Status,
                        Date = r.Date,
                        Deviceid = r.Deviceid,
                        Email = r.Email,
                        Address = r.Address,
                        Facebook = r.Address,
                        Twitter = r.Twitter,
                        Skype = r.Skype,
                        Linkedin = r.Skype,
                        Image = r.Image,
                        Lastname = r.Lastname,
                        Homephone = r.Homephone,
                        Companyname = r.Companyname,
                        Title = r.Title,
                        Department = r.Department,
                        Cemail = r.Cemail,
                        Caddress = r.Caddress,
                        Cmobile = r.Cmobile,
                        Profession = r.Profession,
                        Theme = r.Theme,
                        Referalcode = r.Referalcode,
                        Country = r.Country,
                        CardFrontFile = Convert.ToString(b.CardId) + "_F_" + b.Cardfrontfile,
                        CardBackFile = Convert.ToString(b.CardId) + "_B_" + b.Cardbackfile
                    }).ToList();
        }

        public void SaveProfilePicture(int UserId, string FileName)
        {
            var _data = (from e in _context.Register where e.Guid == UserId select e).FirstOrDefault();

            _data.Image = FileName;
            _context.SaveChanges();

        }

        public UsercardDetailelements GetUserDefaultCardById1(int userid)
        {
            UsercardDetailelements _CardImgdetails = new UsercardDetailelements();
            //List<CardElement> _Carddetails = new List<CardElement>();


            var _users = new Register();
            try
            {
                _users = (from u in _context.Register.Where(u => u.Guid == userid) select u).FirstOrDefault(); ;

                if (_users != null)
                {
                    var cardid = int.Parse(_users.Theme);
                    var _card = (from e in _context.BusinessCards.Where(i => i.CardId == cardid)
                                 select new BusinessCard
                                 {
                                     CardId = e.CardId,
                                     Cardname = e.Cardname,
                                     Borderradius = e.Borderradius,
                                     Cardfrontfile = Convert.ToString(e.CardId) + "_F_" + e.Cardfrontfile,
                                     Cardbackfile = Convert.ToString(e.CardId) + "_B_" + e.Cardbackfile,
                                     Cardshape = e.Cardshape,
                                     Ispublished = e.Ispublished,
                                     Category = e.Category,
                                     UserName = _users.Name + " " + _users.Lastname
                                 }).FirstOrDefault();

                    _card.Elements = (from e in _context.Cardelements.Where(i => i.CardId == cardid)
                                      from b in _context.BusinessCards.Where(i => i.CardId == cardid)
                                      from grp in _context.Cardelementtypes.Where(i => i.ElementtypeId == e.ElementgroupId)
                                      from ic in _context.CardiconsLookup.Where(i => e.IconImageId == i.Cardiconid).DefaultIfEmpty()

                                      select new CardElement
                                      {
                                          Id = e.Id,
                                          CardArea = e.CardArea,
                                          ElementgroupId = e.ElementgroupId,
                                          Cardlementtagname = e.Cardlementtagname,
                                          Height = e.Height,
                                          Width = e.Width,
                                          PositionX = e.PositionX,
                                          PositionY = e.PositionY,
                                          FontColor = e.FontColor,
                                          FontSize = e.FontSize,
                                          FontWeight = e.FontWeight,
                                          IconImageId = e.IconImageId,
                                          IconImagePostiion = e.IconImagePostiion,
                                          TextHorizontal = e.TextHorizontal,
                                          TextVertical = e.TextVertical,
                                          Elementlineheight = e.Elementlineheight,
                                          IconImageUrl = e.IconImageUrl,
                                          Cardelementtext = e.Cardelementtext,
                                          Iconfile = ic.Iconfile,
                                          ElementTypeName = grp.Elementtypename,


                                      }).ToList();

                    _CardImgdetails = MapCardElementiWithUserDetails1(_users, _CardImgdetails, _card.Elements, _card);
                }
                _users = null;
                return _CardImgdetails;

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        private UsercardDetailelements MapCardElementiWithUserDetails1(Register user, UsercardDetailelements _CardImgdetails, List<CardElement> _Carddetails, BusinessCard carddetails)

        {

            for (var i = 0; i < _Carddetails.Count; i++)
            {
                var cardEle = _Carddetails[i];

                if (cardEle.ElementgroupId == 1)
                {
                    cardEle.Cardelementtext = user.Name + " " + user.Lastname;
                }
                else if (cardEle.ElementgroupId == 10)
                {
                    cardEle.Cardelementtext = user.Caddress;
                }
                else if (cardEle.ElementgroupId == 11)
                {
                    cardEle.Cardelementtext = user.Cmobile;
                }
                else if (cardEle.ElementgroupId == 13)
                {
                    cardEle.Cardelementtext = user.Fax;
                }
                else if (cardEle.ElementgroupId == 14)
                {
                    cardEle.Cardelementtext = user.Logo;
                }
                else if (cardEle.ElementgroupId == 15)
                {
                    cardEle.Cardelementtext = user.Profession;
                }
                else if (cardEle.ElementgroupId == 16)
                {
                    cardEle.Cardelementtext = user.Image;
                }
                else if (cardEle.ElementgroupId == 2)
                {
                    cardEle.Cardelementtext = user.Email;
                }
                else if (cardEle.ElementgroupId == 3)
                {
                    cardEle.Cardelementtext = user.Mobile;
                }
                else if (cardEle.ElementgroupId == 4)
                {
                    cardEle.Cardelementtext = user.Address;
                }
                else if (cardEle.ElementgroupId == 5)
                {
                    cardEle.Cardelementtext = user.Companyname;
                }
                else if (cardEle.ElementgroupId == 6)
                {
                    cardEle.Cardelementtext = user.Title;
                }
                else if (cardEle.ElementgroupId == 7)
                {
                    cardEle.Cardelementtext = user.Department;
                }
                else if (cardEle.ElementgroupId == 8)
                {
                    cardEle.Cardelementtext = user.Cemail;
                }
                else if (cardEle.ElementgroupId == 9)
                {
                    cardEle.Cardelementtext = user.Website;
                }


            }
            var _x = new UsercardDetailelements();
            //_x.CardelElement =_Carddetails;
            _x.carddetails = carddetails;

            //var IconFile = GetIconFileName(cardEle.IconImageId);
            //_x.CardiconsLookup = IconFile;



            _CardImgdetails = _x;

            return _CardImgdetails;
        }

        public List<BusinessCard> GetAllBusinessCards()
        {
            return (from r in _context.BusinessCards
                    select new BusinessCard
                    {
                        CardId = r.CardId,
                        Cardname = r.Cardname
                    }).ToList();

        }

        public BusinessCard GetBusinessCardthemeById(int cardid)
        {
            try
            {
                return (from e in _context.BusinessCards.Where(i => i.CardId == cardid)
                        select new BusinessCard
                        {
                            CardId = e.CardId,
                            Cardname = e.Cardname,
                            Borderradius = e.Borderradius,
                            Cardfrontfile = Convert.ToString(e.CardId) + "_F_" + e.Cardfrontfile,
                            Cardbackfile = Convert.ToString(e.CardId) + "_B_" + e.Cardbackfile,
                            Cardshape = e.Cardshape,

                        }).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public CardCategories GetCategoryById(int categoryId)
        {
            try
            {

                var _data = (from e in _context.CardsCategories.Where(i => i.Guid == categoryId)
                             select new CardCategories
                             {
                                 categorieID = e.Guid,
                                 categorieName = e.Name,
                                 Image = e.Image,
                                 Date = e.Date


                             }).FirstOrDefault();
                return _data;
                //  return true;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public Professions GetProffesionById(int proffeId)
        {
            try
            {

                var _data = (from e in _context.Profession.Where(i => i.Guid == proffeId)
                             select new Professions
                             {
                                 Id = e.Guid,
                                 Name = e.Name,
                                 Date = e.Date


                             }).FirstOrDefault();
                return _data;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public cardicons GetIconById(int IconId)
        {
            try
            {

                var _data = (from e in _context.CardiconsLookup.Where(i => i.Cardiconid == IconId)
                             select new cardicons
                             {
                                 iconId = e.Cardiconid,
                                 iconName = e.Iconname,
                                 iconFileName = e.Iconfile


                             }).FirstOrDefault();
                return _data;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public int createORUpdateCategory(int Cate_Id, string categoryName, string categoryFileName)
        {
            try
            {
                if (Cate_Id == 0)
                {
                    var category = new CardsCategories
                    {
                        Name = categoryName,
                        Image = categoryFileName
                    };
                    _context.CardsCategories.Add(category);
                    _context.SaveChanges();
                    Cate_Id = category.Guid;


                }
                else
                {
                    var _data = (from e in _context.CardsCategories.Where(i => i.Guid == Cate_Id) select e).FirstOrDefault();
                    if (_data != null)
                    {
                        _data.Name = categoryName;
                        _data.Image = categoryFileName;
                    }
                    _context.SaveChanges();
                    Cate_Id = _data.Guid;
                }


                return Cate_Id;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public bool createORUpdateProffesion(int Prof_Id, string ProffesionName)
        {
            try
            {
                if (Prof_Id == 0)
                {
                    _context.Profession.Add(new Profession
                    {
                        Name = ProffesionName
                    });

                }
                else
                {
                    var _data = (from e in _context.Profession.Where(i => i.Guid == Prof_Id) select e).FirstOrDefault();
                    if (_data != null)
                    {
                        _data.Name = ProffesionName;
                    }

                }
                _context.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public int createORUpdateIcon(int IconId, string IconName, string IconfileName)
        {
            try
            {
                if (IconId == 0)
                {
                    var newicon = new CardiconsLookup
                    {
                        Iconname = IconName,
                        Iconfile = IconfileName
                    };
                    _context.CardiconsLookup.Add(newicon);
                    _context.SaveChanges();
                    IconId = newicon.Cardiconid;
                }
                else
                {
                    var _data = (from e in _context.CardiconsLookup.Where(i => i.Cardiconid == IconId) select e).FirstOrDefault();
                    if (_data != null)
                    {
                        _data.Iconname = IconName;
                        _data.Iconfile = IconfileName;
                    }
                    _context.SaveChanges();
                    IconId = _data.Cardiconid;

                }


                return IconId;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public bool DeleteCategory(int cate_Id)
        {
            if (cate_Id != 0)
            {
                var item = _context.CardsCategories.SingleOrDefault(i => i.Guid == cate_Id);
                if (item != null)
                {
                    _context.CardsCategories.Remove(item);
                    _context.SaveChanges();
                }
            }

            return true;
        }
        public bool DeleteProffesion(int Pro_Id)
        {
            if (Pro_Id != 0)
            {
                var item = _context.Profession.SingleOrDefault(i => i.Guid == Pro_Id);
                if (item != null)
                {
                    _context.Profession.Remove(item);
                    _context.SaveChanges();
                }
            }

            return true;
        }

        public bool DeleteIcon(int Icon_Id)
        {
            if (Icon_Id != 0)
            {
                var item = _context.CardiconsLookup.SingleOrDefault(i => i.Cardiconid == Icon_Id);
                if (item != null)
                {
                    _context.CardiconsLookup.Remove(item);
                    _context.SaveChanges();
                }
            }

            return true;
        }

        public UsercardDetailelements GetDummyuserdetails(int CardId)
        {
            UsercardDetailelements _CardImgdetails = new UsercardDetailelements();


            var _users = new Register();
            try
            {
                _users = (from u in _context.DummyUser.Where(u => u.Id == 1)
                          select new Register
                          {
                              Guid = u.Id,
                              Name = u.Name,
                              Mobile = u.Mobile,
                              Date = u.Date,

                              Email = u.Email,
                              Address = u.Address,
                              Facebook = u.Facebook,
                              Twitter = u.Twitter,
                              Skype = u.Skype,
                              Linkedin = u.Linkedin,
                              Cemail = u.Cemail,
                              // Nameshow =e.Nameshow,
                              //Emailshow =e.Emailshow,
                              // Mobilenumbershow =e.Mobilenumbershow,
                              // Addressshow =e.Addressshow,
                              //Facebookshow=e.Facebookshow,
                              //Twittershow =e.Twittershow,
                              // Skypeshow=e.Skypeshow,
                              //Linkedinshow =e.Linkedinshow,
                              Image = u.Image,
                              //Imageshow =e.Imageshow,
                              Lastname = u.Lastname,
                              Companyname = u.Companyname,
                              Title = u.Title,
                              Department = u.Department,
                              Website = u.Website,
                              Caddress = u.Caddress,
                              Cmobile = u.Cmobile,
                              Exten = u.Exten,
                              Fax = u.Fax,
                              Logo = u.Logo,
                              // Lastnameshow=e.Lastnameshow,
                              // Companynameshow=e.Companynameshow,
                              // Titleshow=e.Titleshow,
                              // Departmentshow=e.Departmentshow,
                              // Websiteshow=e.Websiteshow,
                              //  Profession=u.Profession,
                              //Extshow=e.Extshow,
                              //  Faxshow=e.Faxshow,
                              //  Logoshow=e.Logoshow,
                              // Theme=e.Theme,
                              Country = u.Country

                          }
                          ).FirstOrDefault(); ;

                if (_users != null)
                {
                    // var cardid = int.Parse(_users.Theme);
                    var _card = (from e in _context.BusinessCards.Where(i => i.CardId == CardId)
                                 select new BusinessCard
                                 {
                                     CardId = e.CardId,
                                     Cardname = e.Cardname,
                                     Borderradius = e.Borderradius,
                                     Cardfrontfile = Convert.ToString(e.CardId) + "_F_" + e.Cardfrontfile,
                                     Cardbackfile = Convert.ToString(e.CardId) + "_B_" + e.Cardbackfile,
                                     Cardshape = e.Cardshape,
                                     Ispublished = e.Ispublished,
                                     Category = e.Category,
                                     UserName = _users.Name + " " + _users.Lastname
                                 }).FirstOrDefault();

                    _card.Elements = (from e in _context.Cardelements.Where(i => i.CardId == CardId)
                                      from grp in _context.Cardelementtypes.Where(i => i.ElementtypeId == e.ElementgroupId)
                                      from ic in _context.CardiconsLookup.Where(i => e.IconImageId == i.Cardiconid).DefaultIfEmpty()

                                      select new CardElement
                                      {
                                          Id = e.Id,
                                          CardArea = e.CardArea,
                                          ElementgroupId = e.ElementgroupId,
                                          Cardlementtagname = e.Cardlementtagname,
                                          Height = e.Height,
                                          Width = e.Width,
                                          PositionX = e.PositionX,
                                          PositionY = e.PositionY,
                                          FontColor = e.FontColor,
                                          FontSize = e.FontSize,
                                          FontWeight = e.FontWeight,
                                          IconImageId = e.IconImageId,
                                          IconImagePostiion = e.IconImagePostiion,
                                          TextHorizontal = e.TextHorizontal,
                                          TextVertical = e.TextVertical,
                                          Elementlineheight = e.Elementlineheight,
                                          IconImageUrl = e.IconImageUrl,
                                          Cardelementtext = e.Cardelementtext,
                                          Iconfile = ic.Iconfile,
                                          ElementTypeName = grp.Elementtypename,


                                      }).ToList();

                    _CardImgdetails = MapCardElementiWithUserDetails1(_users, _CardImgdetails, _card.Elements, _card);
                }
                _users = null;
                return _CardImgdetails;

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public bool saveDummyuserdetails(RegisteredUsers details)
        {
            try
            {
                var _data = (from e in _context.DummyUser.Where(i => i.Id == 1) select e).FirstOrDefault();
                if (_data != null)
                {
                    _data.Name = details.Name;
                    _data.Email = details.Email;
                    _data.Mobile = details.Mobile;
                    _data.Date = DateTime.Now;
                    _data.Address = details.Address;
                    _data.Companyname = details.Companyname;

                    _data.Website = details.Website;

                    _data.Caddress = details.Caddress;

                    _data.Cmobile = details.Cmobile;
                    _data.Exten = details.Exten;

                    _data.Fax = details.Fax;

                    _data.Logo = details.Logo;

                    _data.Profession = details.Profession;
                }
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {

                throw;
            }

        }
        public void SendMeetingInvite(MeetingInvitation _invitation)
        {
            string dateString = _invitation.EventDate;
            DateTime date = Convert.ToDateTime(dateString, System.Globalization.CultureInfo.GetCultureInfo("ur-PK").DateTimeFormat);
            Newmeetings _meeting = new Newmeetings();
            try
            {
                _meeting.Userid = _invitation.Userid;
                _meeting.Title = _invitation.Title;
                _meeting.Notes = _invitation.Description;
                _meeting.Host = GetHostName(_invitation.Userid);
                _meeting.Participant = _invitation.Participant;
                _meeting.EventDate = date;
                _meeting.Date = date.ToString("ddd dd, MMM yyy HH:mm:ss");
                _meeting.Duration = _invitation.Duration;
                _meeting.Createdstatus = "Pending";
                _meeting.Createddate = DateTime.Now;
                _context.Add(_meeting);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string GetHostName(int UserId)
        {
            using (var _db = new nobhubtestContext())
            {
                var Name = (from e in _db.Register where e.Guid == UserId select e.Name).SingleOrDefault();
                return "Invitation From " + Name;
            }
        }
        public List<MeetingInvitation> GetMeetings(int UserId)
        {
            try
            {
                return (from m in _context.Newmeetings
                        where m.Userid == UserId
                        select new MeetingInvitation
                        {
                            Id = m.Guid,
                            Participant = m.Participant,
                            Title = m.Title,
                            EventDate = m.EventDate.ToString(),
                            Duration = m.Duration,
                            Createdstatus = m.Createdstatus,
                            Createddate = m.Createddate
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool GetUserFCMToken(useridFCMToken data)
        {
            try
            {
                var FCMTokenDetails = _context.Devicefcmtoken.Where(i => i.Fcmtoken == data.FCMToken).FirstOrDefault();
                if (FCMTokenDetails != null)
                {

                    if (FCMTokenDetails.Userid != data.UserId)///TODO: Update User ID 
                    {

                        FCMTokenDetails.Userid = data.UserId;
                        _context.SaveChanges();

                    }
                }
                else///TODO: insert new token and userid
                {
                    var Uerdata = new Devicefcmtoken
                    {
                        Userid = data.UserId,
                        Fcmtoken = data.FCMToken
                    };
                    _context.Devicefcmtoken.Add(Uerdata);
                    _context.SaveChanges();

                }
            }
            catch (Exception ex)
            {
                // return false;
                throw ex;

            }

            return true;
        }


        public int createChannel(ChannelForUsers forUsers)
        {

            Channels channels = new Channels();
            try
            {
                using (var context = new nobhubtestContext())
                {
                    //var channelId = context.Userchannels.Where(x => x.Userid == forUsers.fromUserID &&context.Userchannels.Any(c => c.Channelid == x.Channelid && c.Userid == forUsers.toUserId)
                    //                               ).Select(y => y.Channelid).FirstOrDefault();
                    var channelId = context.Userchannels
                                                   .Where(x => x.Userid == forUsers.fromUserID &&
                                                               !context.Channelgroups.Any(c => c.Channelid == x.Channelid) &&
                                                               context.Userchannels.Any(c => c.Channelid == x.Channelid && c.Userid == forUsers.toUserId)
                                                   ).Select(y => y.Channelid).FirstOrDefault();
                    if (channelId > 0)
                    {

                        return channelId;
                    }
                    else
                    {
                        var createchannel = context.Channels.Add(channels);
                        context.SaveChanges();

                        Userchannels userchannels = new Userchannels();
                        userchannels.Channelid = channels.Channelid;
                        userchannels.Userid = forUsers.fromUserID;
                        context.Userchannels.Add(userchannels);

                        userchannels = new Userchannels();
                        userchannels.Userid = forUsers.toUserId;
                        userchannels.Channelid = channels.Channelid;
                        context.Userchannels.Add(userchannels);
                        context.SaveChanges();
                    }

                }
            }
            catch (Exception ex)
            {


            }


            return channels.Channelid;
        }
        public bool InsertMessage(UserMsg data)
        {
            try
            {
                using (var context = new nobhubtestContext())
                {


                    Channelmessages usermessages = new Channelmessages();
                    usermessages.Channelid = data.ChannelId;
                    usermessages.Userid = data.FromUserId;
                    usermessages.Message = data.message;
                    context.Channelmessages.Add(usermessages);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return true;
        }
        public void sendNearbyInvite(NearbyInvites _invitation)
        {
            string requestTo = _context.Register.Where(i => i.Guid == _invitation.Cid).Select(i => i.Name+" "+ i.Lastname).FirstOrDefault();
            // string dateString = _invitation.EventDate;
            // DateTime date = Convert.ToDateTime(dateString, System.Globalization.CultureInfo.GetCultureInfo("ur-PK").DateTimeFormat);
            Invites invitation = new Invites();
            try
            {
                invitation.Refid = _invitation.Refid.ToString();
                invitation.Cid = _invitation.Cid.ToString();
                invitation.Fromdes = requestTo;
                invitation.Cdes = "You have receive a request from " + _invitation.Cdes;
                invitation.Fromstatus = "pending";
                // invitation.Fromstatus = _invitation.Fromstatus;                
                invitation.Date = DateTime.Now;
                invitation.Accepteddate = DateTime.Now.ToString();
                invitation.Inviteddate = DateTime.Now.ToString();
                _context.Invites.Add(invitation);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<channelmessageobj> FetchmessagesbyChannelId(channelmsgs data)
        {
            List<channelmessageobj> channelmsgs=new List<channelmessageobj>();
            try
            {
                using (var context = new nobhubtestContext())
                {
                    data.channelId = context.Userchannels
                                                  .Where(x => x.Userid == data.FromuserId &&
                                                              !context.Channelgroups.Any(c => c.Channelid == x.Channelid) &&
                                                              context.Userchannels.Any(c => c.Channelid == x.Channelid && c.Userid == data.TouserId)
                                                  ).Select(y => y.Channelid).FirstOrDefault();

                    IQueryable<channelmessageobj> msgslist = (from u in _context.Channelmessages.Where(i => i.Channelid == data.channelId)
                                                              from j in _context.Usermessages.Where(i => i.Messageid == u.Id && i.Userid == data.TouserId).DefaultIfEmpty()
                                                              where (u.Userid == data.TouserId || j != null)
                                                              select new channelmessageobj
                                                              {
                                                                  _id =u.Id,
                                                                  text = u.Message,
                                                                  createdAt = u.Sentdate,
                                                                  Isread = j.Isread,
                                                                  messageId = u.Id,
                                                                  user =new user { _id = u.Userid },                          
                                                                  ChannelId = data.channelId

                                                              }).OrderByDescending(k => k.messageId).Skip(0).Take(20);
                    
                        channelmsgs = new List<channelmessageobj>(msgslist);
  
                    if (channelmsgs.Count == 0)
                    {
                        channelmessageobj obj = new channelmessageobj
                        {
                            ChannelId = data.channelId
                        };
                        channelmsgs.Add(obj);
                    }
                  
                   

                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return channelmsgs;

        }

        public void SaveChannelMessage(channelmsgs _msg)
        {
            _msg.channelId = _context.Userchannels
                                                 .Where(x => x.Userid == _msg.FromuserId &&
                                                             !_context.Channelgroups.Any(c => c.Channelid == x.Channelid) &&
                                                             _context.Userchannels.Any(c => c.Channelid == x.Channelid && c.Userid == _msg.TouserId)
                                                 ).Select(y => y.Channelid).FirstOrDefault();
            //var anyMatchingfromId = _context.Userchannels.Where(x => x.Userid == _msg.FromuserId).Select(y => y.Channelid).FirstOrDefault();
            //var anyMatchingtoId = _context.Userchannels.Where(x => x.Userid == _msg.TouserId).Select(y => y.Channelid).FirstOrDefault();
            //if (anyMatchingfromId == anyMatchingtoId)
            //{
            //    _msg.channelId = anyMatchingfromId;
            //}
           // var msgobj = _msg.messages.FirstOrDefault();
            if (_msg.strmessage != null)
            {
                Channelmessages newMsg = new Channelmessages();
                try
                {
                    newMsg.Message = _msg.strmessage;
                    newMsg.Channelid = _msg.channelId;
                    newMsg.Userid = _msg.FromuserId;
                    newMsg.Sentdate = DateTime.Now;
                    _context.Channelmessages.Add(newMsg);
                    _context.SaveChanges();

                    _context.Userchannels.Where(c => c.Channelid == _msg.channelId &&
                                                   c.Userid != _msg.FromuserId).ToList().ForEach(k =>

                        {
                            var usrMsg = new Usermessages();
                            usrMsg.Userid = k.Userid;
                            usrMsg.Messageid = newMsg.Id;
                            _context.Usermessages.Add(usrMsg);
                            _context.SaveChanges();


                        });


                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }

        }

        public List<string> GetUserFCMTokens(int userId)
        {

            try
            {


                var userTokens = _context.Devicefcmtoken.Where(i => i.Userid == userId).Select(i => i.Fcmtoken).ToList();

                return userTokens;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public List<string> GetChannelUserTokens(int ChannelId,string LoginUserFcmToken)
        {

            try
            {


                var userTokens = ((from c in _context.Userchannels.Where(c => c.Channelid == ChannelId)
                                   from d in _context.Devicefcmtoken.Where(i => i.Userid == c.Userid && i.Fcmtoken != LoginUserFcmToken)
                                   select d.Fcmtoken).ToList());

                return userTokens;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public List<FriendInvitation> GetInvitations(int UserId)
        {
            List<FriendInvitation> _invitations = new List<FriendInvitation>();
            _invitations = (from i in _context.Invites where i.Refid == UserId.ToString() && i.Fromstatus == "Pending"
                            select new FriendInvitation {
                                Cid = i.Cid,
                                Guid = i.Guid,
                                Inviteddate = i.Inviteddate,
                            }).ToList();
            return _invitations;
        }



    }


}

