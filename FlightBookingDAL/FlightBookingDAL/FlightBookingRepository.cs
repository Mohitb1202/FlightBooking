using FlightBookingDAL.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FlightBookingDAL
{
    public class FlightBookingRepository
    {
        private FlightBookingDBContext context;

        public FlightBookingRepository(FlightBookingDBContext context)
        {
            this.context = context;
        }

        public List<Flight> GetFlightDetails()
        {
            var FlightList = context.Flights.OrderBy(f => f.FlightId).ToList();
            return FlightList;
        }

        public List<FlightBooking> GetBookingDetails()
        {
            var BookingList = context.FlightBookings.OrderBy(f => f.BookingId).ToList();
            return BookingList;
        }

        public string ValidateLogin(string emailId, string password)
        {
            string result =null;
            try
            {
                var logUser = (from usr in context.Users
                               where usr.EmailId == emailId && usr.Password == password
                               select usr.UserName).FirstOrDefault();

                if (logUser != null)
                {
                    result = logUser;
                }
                else
                {
                    result = null;
                }
            }
            catch (Exception)
            {
                result = null;
            }
            return result;
        }


        public List<FlightBooking> GetPassengerFlightDetails(int bookingId)
        {
            List<FlightBooking> lstBooking = new List<FlightBooking>();
            try
            {
                lstBooking = context.FlightBookings.Where(a => a.BookingId == bookingId).ToList();
            }
            catch(Exception ex)
            {
                lstBooking = null;
            }
            
            return lstBooking;
        }
        public bool BookFlight(FlightBooking flightBookingObj)
        {
            bool status = false;
            try
            {
                context.FlightBookings.Add(flightBookingObj);
                context.SaveChanges();
                status = true;
            }
            catch(Exception ex)
            {
                status = false;
            }
            return status;
        }
        public bool Register(User user)
        {
            bool status = false;
            try
            {
                context.Users.Add(user);
                context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

        public bool updateNoOfTickets(int bookingId,int noOfTickets)
        {
            bool status = false;
            FlightBooking flightBook = context.FlightBookings.Find(bookingId);
            try
            {
                if (flightBook != null)
                {
                    flightBook.NoOfTickets = noOfTickets;
                    context.SaveChanges();
                    status = true;
                }
            }
            catch(Exception ex)
            {
                status = false;
            }
            return status;

        }

        public bool CancelBooking(int bookingId)
        {
            bool status = false;
            FlightBooking flightBook = context.FlightBookings.Find(bookingId);
            try
            {
                if (flightBook != null)
                {
                    context.FlightBookings.Remove(flightBook);
                    status = true;
                    context.SaveChanges();                    
                }
            }
            catch(Exception ex)
            {
                status = false;
            }
            return status;
            
        }
    }
}
