using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ECommerce.Migrations
{
    public partial class IdNamingFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "productid",
                table: "Products",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "customerid",
                table: "Customers",
                newName: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "Products",
                newName: "productid");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Customers",
                newName: "customerid");
        }
    }
}
