using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace FlightBookingDAL.models
{
    public partial class FlightBookingDBContext : DbContext
    {
        public FlightBookingDBContext()
        {
        }

        public FlightBookingDBContext(DbContextOptions<FlightBookingDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Flight> Flights { get; set; } = null!;
        public virtual DbSet<FlightBooking> FlightBookings { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json");
                var config = builder.Build();
                var connectionString = config.GetConnectionString("FlightBookingDBConnectionString");
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Flight>(entity =>
            {
                entity.ToTable("Flight");

                entity.Property(e => e.FlightId)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .HasColumnName("FlightID");

                entity.Property(e => e.AircraftName)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("status");
            });

            modelBuilder.Entity<FlightBooking>(entity =>
            {
                entity.HasKey(e => e.BookingId)
                    .HasName("pk_BookingID");

                entity.ToTable("FlightBooking");

                entity.Property(e => e.BookingId).HasColumnName("BookingID");

                entity.Property(e => e.FlightId)
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .HasColumnName("FlightID");

                entity.Property(e => e.NoOfTickets).HasColumnName("noOfTickets");

                entity.Property(e => e.PassengerName)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.HasOne(d => d.Flight)
                    .WithMany(p => p.FlightBookings)
                    .HasForeignKey(d => d.FlightId)
                    .HasConstraintName("fk_FlightID");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.EmailId)
                    .HasName("pk_EmailId");

                entity.Property(e => e.EmailId)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("EmailID");

                entity.Property(e => e.ContactNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
