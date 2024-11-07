using Microsoft.AspNetCore.Mvc;
using FlightBookingDAL;
using FlightBookingDAL.models;
using Microsoft.VisualBasic;

namespace FlightBookingServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FlightController : Controller
    {
        FlightBookingRepository repository;

        public FlightController(FlightBookingRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public JsonResult GetFlightDetails()
        {
            List<Flight> flights = new List<Flight>();
            try
            {
                flights = repository.GetFlightDetails();
            }
            catch(Exception ex)
            {
                flights = null;
            }
            return Json(flights);
        }
        
        [HttpGet]
        public JsonResult GetBookingDetails()
        {
            List<FlightBooking> bookings = new List<FlightBooking>();
            try
            {
                bookings = repository.GetBookingDetails();
            }
            catch (Exception ex)
            {
                bookings = null;
            }
            return Json(bookings);
        }

        [HttpGet]
        public JsonResult GetPassengerFlightDetails(FlightBooking flightBookObj)
        {
            List<FlightBooking> flights = new List<FlightBooking>();
            try
            {
                flights = repository.GetPassengerFlightDetails(flightBookObj.BookingId);
            }
            catch (Exception ex)
            {
                flights = null;
            }
            return Json(flights);
        }

        [HttpPost]
        public JsonResult ValidateLogin(User user)
        {
            string status = null;
            string result = null;

            try
            {
               status = repository.ValidateLogin(user.EmailId,user.Password);
                if (status != null)
                {
                    result = status;
                }
                else
                {
                    result = "invalid credentials";
                }
            }
            catch (Exception ex)
            {
                
               result = "some error occured";
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult BookFlight(FlightBooking book)
        {
            bool status = false;
            string result = null;
            try
            {
                status = repository.BookFlight(book);
                if (status)
                {
                    result = "Congratulations!!Your Trip is Booked with bookingId = "+book.BookingId;
                }
                else
                {
                    result = "Sorry! some error occured";
                }
            }
            catch(Exception ex)
            {
                result = null;
            }
            return Json(result);

        }
        [HttpPost]
        public JsonResult Register(User userObj)
        {
            bool status = false;
            string result = null;
            try
            {
                status = repository.Register(userObj);
                if (status)
                {
                    result = "Registration Successful";
                }
                else
                {
                    result = "Sorry! some error occured";
                }
            }
            catch (Exception ex)
            {
                result = null;
            }
            return Json(result);

        }

        [HttpPut]
        public JsonResult updateNoOfTickets(FlightBooking flightBookObj)
        {
            bool status = false;
            string msg = null;
            try
            {
                status= repository.updateNoOfTickets(flightBookObj.BookingId,flightBookObj.NoOfTickets);
                if(status)
                {
                    msg = "Booking is updated";

                }
                else
                {
                    msg = "Sorry Booking not updated";
                }
            }
            catch (Exception ex)
            {
                msg = "some error occured";
            }
            return Json(msg);
        }

        [HttpDelete]
        public JsonResult cancelBooking(FlightBooking flightBookObj)
        {
            bool status = false;
            string result = null;
            try
            {
                status = repository.CancelBooking(flightBookObj.BookingId);
                if (status)
                {
                    result = "Booking Cancelled";
                }
                else
                {
                    result = "Booking is not cancelled";
                }
            }
            catch (Exception ex)
            {
                result = "some error occured";
            }
            return Json(result);
        }

    }
}
