using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ECommerce.Models;

namespace ECommerce.Migrations
{
    [DbContext(typeof(ECommerceContext))]
    [Migration("20171018023250_AddCustomerTable")]
    partial class AddCustomerTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "1.1.3");

            modelBuilder.Entity("ECommerce.Models.Product", b =>
                {
                    b.Property<int>("productid")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("created_at");

                    b.Property<string>("description");

                    b.Property<string>("img_url");

                    b.Property<string>("name");

                    b.Property<int>("quantity");

                    b.Property<DateTime>("updated_at");

                    b.HasKey("productid");

                    b.ToTable("Products");
                });
        }
    }
}
