using System;
using System.Collections.Generic;

namespace FlightBookingDAL.models
{
    public partial class User
    {
        public string UserName { get; set; } = null!;
        public string EmailId { get; set; } = null!;
        public string ContactNumber { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Gender { get; set; } = null!;
    }
}
