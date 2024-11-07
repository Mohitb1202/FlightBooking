using System;
using System.Collections.Generic;

namespace FlightBookingDAL.models
{
    public partial class Flight
    {
        public Flight()
        {
            FlightBookings = new HashSet<FlightBooking>();
        }

        public string FlightId { get; set; } = null!;
        public string AircraftName { get; set; } = null!;
        public string Status { get; set; } = null!;
        public int Fare { get; set; }
        public int AvailableSeats { get; set; }

        public virtual ICollection<FlightBooking> FlightBookings { get; set; }
    }
}
