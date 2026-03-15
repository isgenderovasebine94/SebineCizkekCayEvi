using Microsoft.EntityFrameworkCore;
using SebineCizkekCayEviAPİ.Models;


namespace SebineCizkekCayEviAPİ.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Products");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
                entity.Property(e => e.ImageUrl).HasMaxLength(300);
                entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
                entity.Property(e => e.IsActive).HasDefaultValue(true);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("GETUTCDATE()");
            });

            modelBuilder.Entity<Admin>().HasData(new Admin
            {
                Id = 1,
                Username = "Sebine Isgenderova",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Sabina123@")
            });


            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Orders");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CustomerName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Phone).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Address).HasMaxLength(300);
                entity.Property(e => e.TotalPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.PaymentType).IsRequired().HasMaxLength(20);
                entity.Property(e => e.OrderDate).HasDefaultValueSql("GETUTCDATE()");
                entity.Property(e => e.Status).HasMaxLength(20).HasDefaultValue("Pending");
            });

           
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.ToTable("OrderItems");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Quantity).IsRequired();
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");

                entity.HasOne(e => e.Order)
                    .WithMany(o => o.OrderItems)
                    .HasForeignKey(e => e.OrderId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Product)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(e => e.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

           
            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.ToTable("Reservations");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Phone).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Date).IsRequired();
                entity.Property(e => e.Time).IsRequired().HasMaxLength(10);
                entity.Property(e => e.PeopleCount).IsRequired();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("GETUTCDATE()");
                entity.Property(e => e.Status).HasMaxLength(20).HasDefaultValue("Pending");
            });

            
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "New York Cheesecake", Description = "Klassik resept, kremli texture", Price = 8m, ImageUrl = "/images/ny-cheesecake.jpg", Category = "cheesecake", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 2, Name = "Cherry Cheesecake", Description = "Təzə vişnə ilə hazırlanıb", Price = 9m, ImageUrl = "/images/cherry-cheesecake.jpg", Category = "cheesecake", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 3, Name = "Cherry Chocolate Cheesecake", Description = "Təzə vişnə və şokolad ilə hazırlanıb", Price = 10m, ImageUrl = "/images/cherry-chocolate-cheesecake.jpg", Category = "cheesecake", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 4, Name = "Strawberry Cheesecake", Description = "Təzə çiyələk ilə hazırlanıb", Price = 9m, ImageUrl = "/images/strawberry-cheesecake.jpg", Category = "cheesecake", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 5, Name = "Raspberry Cheesecake", Description = "Təzə moruq ilə hazırlanıb", Price = 9m, ImageUrl = "/images/raspberry-cheesecake.jpg", Category = "cheesecake", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 6, Name = "Raffaello Cheesecake", Description = "Kokoslu krem qatları və ağ şokolad örtüyü", Price = 9m, ImageUrl = "/images/rafaello-cheesecake.jpg", Category = "cheesecake", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 7, Name = "Oreo Cheesecake", Description = "Oreo parça və krem ilə", Price = 9m, ImageUrl = "/images/oreo-cheesecake.jpg", Category = "cheesecake", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 8, Name = "Lotus Cheesecake", Description = "Lotus biskvit və karamel", Price = 10m, ImageUrl = "/images/lotus-cheesecake.jpg", Category = "cheesecake", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 9, Name = "Chocolate Dream Cake", Description = "Zəngin şokolad qatları", Price = 7m, ImageUrl = "/images/chocolate-cake.jpg", Category = "tort", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 10, Name = "Red Velvet", Description = "Krem peynir ilə klassik", Price = 8m, ImageUrl = "/images/red-velvet.jpg", Category = "tort", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 11, Name = "Caramel Cake", Description = "Karamel sous ilə hazırlanıb", Price = 7m, ImageUrl = "/images/caramel-cake.jpg", Category = "tort", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 12, Name = "Azərbaycan Qara Çay", Description = "Yerli plantasiyalardan", Price = 3m, ImageUrl = "/images/black-tea.jpg", Category = "çay", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 13, Name = "Earl Grey", Description = "Bergamot aromalı klassik", Price = 4m, ImageUrl = "/images/earl-grey.jpg", Category = "çay", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 14, Name = "Yaşıl Çay", Description = "Antioksidant zəngin seçim", Price = 4m, ImageUrl = "/images/green-tea.jpg", Category = "çay", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) },
                new Product { Id = 15, Name = "Meyvəli Çay", Description = "Mövsümi meyvələrlə blend", Price = 5m, ImageUrl = "/images/fruit-tea.jpg", Category = "çay", IsActive = true, CreatedDate = new DateTime(2026, 3, 10) }
            );
        }
    }
}

