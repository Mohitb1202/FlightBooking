using System;
using System.Collections.Generic;

namespace FlightBookingDAL.models
{
    public partial class FlightBooking
    {
        public int BookingId { get; set; }
        public string PassengerName { get; set; } = null!;
        public int NoOfTickets { get; set; }
        public int TotalAmount { get; set; }
        public string? FlightId { get; set; }

        public virtual Flight? Flight { get; set; }
    }
}
