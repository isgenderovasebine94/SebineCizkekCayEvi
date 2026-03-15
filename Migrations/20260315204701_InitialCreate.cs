using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SebineCizkekCayEviAPİ.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Pending")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Time = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    PeopleCount = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: "Pending")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "PasswordHash", "Username" },
                values: new object[] { 1, "$2a$11$kz5NikZ7iEDFoInFegOYbupz1m.kEAdtPXpCU0zLTtUTkIcA75Syi", "Sebine Isgenderova" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "CreatedDate", "Description", "ImageUrl", "IsActive", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "cheesecake", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Klassik resept, kremli texture", "/images/ny-cheesecake.jpg", true, "New York Cheesecake", 8m },
                    { 2, "cheesecake", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Təzə vişnə ilə hazırlanıb", "/images/cherry-cheesecake.jpg", true, "Cherry Cheesecake", 9m },
                    { 3, "cheesecake", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Təzə vişnə və şokolad ilə hazırlanıb", "/images/cherry-chocolate-cheesecake.jpg", true, "Cherry Chocolate Cheesecake", 10m },
                    { 4, "cheesecake", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Təzə çiyələk ilə hazırlanıb", "/images/strawberry-cheesecake.jpg", true, "Strawberry Cheesecake", 9m },
                    { 5, "cheesecake", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Təzə moruq ilə hazırlanıb", "/images/raspberry-cheesecake.jpg", true, "Raspberry Cheesecake", 9m },
                    { 6, "cheesecake", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Kokoslu krem qatları və ağ şokolad örtüyü", "/images/rafaello-cheesecake.jpg", true, "Raffaello Cheesecake", 9m },
                    { 7, "cheesecake", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Oreo parça və krem ilə", "/images/oreo-cheesecake.jpg", true, "Oreo Cheesecake", 9m },
                    { 8, "cheesecake", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Lotus biskvit və karamel", "/images/lotus-cheesecake.jpg", true, "Lotus Cheesecake", 10m },
                    { 9, "tort", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Zəngin şokolad qatları", "/images/chocolate-cake.jpg", true, "Chocolate Dream Cake", 7m },
                    { 10, "tort", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Krem peynir ilə klassik", "/images/red-velvet.jpg", true, "Red Velvet", 8m },
                    { 11, "tort", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Karamel sous ilə hazırlanıb", "/images/caramel-cake.jpg", true, "Caramel Cake", 7m },
                    { 12, "çay", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Yerli plantasiyalardan", "/images/black-tea.jpg", true, "Azərbaycan Qara Çay", 3m },
                    { 13, "çay", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bergamot aromalı klassik", "/images/earl-grey.jpg", true, "Earl Grey", 4m },
                    { 14, "çay", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Antioksidant zəngin seçim", "/images/green-tea.jpg", true, "Yaşıl Çay", 4m },
                    { 15, "çay", new DateTime(2026, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mövsümi meyvələrlə blend", "/images/fruit-tea.jpg", true, "Meyvəli Çay", 5m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
