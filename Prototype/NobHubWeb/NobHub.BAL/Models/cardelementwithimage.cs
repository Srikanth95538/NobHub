using NobHub.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace NobHub.BAL.Models
{
    public class cardelementwithimage
    {
        public CardElement CardelElements { get; set; }
        public Cardelementimages Cardelementimages { get; set; }
        public CardiconsLookup CardiconsLookup { get; set; }
        public string ElementGroupName { get; set; }
    }
    public class UsercardDetailelements
    {
        public Cardelementimages Cardelementimages { get; set; }
       // public CardiconsLookup CardiconsLookup { get; set; }
      //  public string ElementGroupName { get; set; }
        public List<CardElement> CardelElement { get; set; }
        public BusinessCard carddetails { get; set; }
    }
}
