using System;
using System.Collections.Generic;
using System.Text;

namespace NobHub.Common
{
    public class AppUtilities
    {
        public static string connectionString { get; set; }
        public static string GetConnectionString()
        {
            return connectionString;
        }
    }
}
