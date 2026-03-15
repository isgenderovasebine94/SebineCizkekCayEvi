using Microsoft.EntityFrameworkCore;
using SebineCizkekCayEviAPİ.Data;
using SebineCizkekCayEviAPİ.Models;
using SebineCizkekCayEviAPİ.Data;
using SebineCizkekCayEviAPİ.Models;
using SebineCizkekCayEviAPİ.Repositories;

namespace SebineCizkekCayEviAPİ.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly AppDbContext _context;

        public ReservationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reservation>> GetAllAsync()
        {
            return await _context.Reservations
                .OrderByDescending(r => r.Date)
                .ThenBy(r => r.Time)
                .ToListAsync();
        }

        public async Task<Reservation?> GetByIdAsync(int id)
        {
            return await _context.Reservations.FindAsync(id);
        }

        public async Task<Reservation> CreateAsync(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }

        public async Task UpdateStatusAsync(int id, string status)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation != null)
            {
                reservation.Status = status;
                await _context.SaveChangesAsync();
            }
        }
    }
}
