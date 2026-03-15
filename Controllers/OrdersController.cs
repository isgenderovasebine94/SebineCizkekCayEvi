using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SebineCizkekCayEviAPİ.DTOs;
using SebineCizkekCayEviAPİ.Models;
using SebineCizkekCayEviAPİ.Repositories;


namespace SebineCizkekCayEviAPİ.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;

        public OrdersController(IOrderRepository orderRepo)
        {
            _orderRepo = orderRepo;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderResponseDto>>> GetAll()
        {
            var orders = await _orderRepo.GetAllAsync();
            var result = orders.Select(o => new OrderResponseDto
            {
                Id = o.Id,
                CustomerName = o.CustomerName,
                Phone = o.Phone,
                Address = o.Address,
                TotalPrice = o.TotalPrice,
                PaymentType = o.PaymentType,
                Status = o.Status,
                OrderDate = o.OrderDate,
                Items = o.OrderItems.Select(oi => new OrderItemResponseDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product?.Name ?? "",
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList()
            });

            return Ok(result);
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderResponseDto>> GetById(int id)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            if (order == null) return NotFound();

            return Ok(new OrderResponseDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Phone = order.Phone,
                Address = order.Address,
                TotalPrice = order.TotalPrice,
                PaymentType = order.PaymentType,
                Status = order.Status,
                OrderDate = order.OrderDate,
                Items = order.OrderItems.Select(oi => new OrderItemResponseDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product?.Name ?? "",
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList()
            });
        }

        
        [HttpPost]
        public async Task<ActionResult<OrderResponseDto>> Create([FromBody] CreateOrderDto dto)
        {
            var order = new Order
            {
                CustomerName = dto.CustomerName,
                Email = dto.Email,
                Phone = dto.Phone,
                Address = dto.Address,
                TotalPrice = dto.TotalPrice,
                PaymentType = dto.PaymentType,
                OrderItems = dto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    Price = i.Price
                }).ToList()
            };

            var created = await _orderRepo.CreateAsync(order);

            var fullOrder = await _orderRepo.GetByIdAsync(created.Id);

            return CreatedAtAction(nameof(GetById), new { id = fullOrder.Id }, new OrderResponseDto
            {
                Id = fullOrder.Id,
                CustomerName = fullOrder.CustomerName,
                Email = fullOrder.Email,
                Phone = fullOrder.Phone,
                Address = fullOrder.Address,
                TotalPrice = fullOrder.TotalPrice,
                PaymentType = fullOrder.PaymentType,
                Status = fullOrder.Status,
                OrderDate = fullOrder.OrderDate,
                Items = fullOrder.OrderItems.Select(oi => new OrderItemResponseDto
                {
                    ProductId = oi.ProductId,
                    ProductName = oi.Product?.Name ?? "",
                    Quantity = oi.Quantity,
                    Price = oi.Price
                }).ToList()
            });
           
        }

        
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            await _orderRepo.UpdateStatusAsync(id, status);
            return NoContent();
        }
    }
}
