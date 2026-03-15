using Microsoft.AspNetCore.Mvc;
using SebineCizkekCayEviAPİ.DTOs;
using SebineCizkekCayEviAPİ.Models;
using SebineCizkekCayEviAPİ.Repositories;


namespace SebineCizkekCayEviAPİ.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepo;

        public ReservationsController(IReservationRepository reservationRepo)
        {
            _reservationRepo = reservationRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservationResponseDto>>> GetAll()
        {
            var reservations = await _reservationRepo.GetAllAsync();
            var result = reservations.Select(r => new ReservationResponseDto
            {
                Id = r.Id,
                Name = r.Name,
                Phone = r.Phone,
                Date = r.Date,
                Time = r.Time,
                PeopleCount = r.PeopleCount,
                Status = r.Status,
                CreatedDate = r.CreatedDate
            });

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationResponseDto>> GetById(int id)
        {
            var reservation = await _reservationRepo.GetByIdAsync(id);
            if (reservation == null) return NotFound();

            return Ok(new ReservationResponseDto
            {
                Id = reservation.Id,
                Name = reservation.Name,
                Phone = reservation.Phone,
                Date = reservation.Date,
                Time = reservation.Time,
                PeopleCount = reservation.PeopleCount,
                Status = reservation.Status,
                CreatedDate = reservation.CreatedDate
            });
        }

        [HttpPost]
        public async Task<ActionResult<ReservationResponseDto>> Create([FromBody] CreateReservationDto dto)
        {
            var reservation = new Reservation
            {
                Name = dto.Name,
                Phone = dto.Phone,
                Date = dto.Date,
                Time = dto.Time,
                PeopleCount = dto.PeopleCount
            };

            var created = await _reservationRepo.CreateAsync(reservation);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, new ReservationResponseDto
            {
                Id = created.Id,
                Name = created.Name,
                Phone = created.Phone,
                Date = created.Date,
                Time = created.Time,
                PeopleCount = created.PeopleCount,
                Status = created.Status,
                CreatedDate = created.CreatedDate
            });
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            await _reservationRepo.UpdateStatusAsync(id, status);
            return NoContent();
        }
    }
}
