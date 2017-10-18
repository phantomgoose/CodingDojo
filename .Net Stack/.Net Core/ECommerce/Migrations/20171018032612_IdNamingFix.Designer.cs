using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ECommerce.Models;

namespace ECommerce.Migrations
{
    [DbContext(typeof(ECommerceContext))]
    [Migration("20171018032612_IdNamingFix")]
    partial class IdNamingFix
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "1.1.3");

            modelBuilder.Entity("ECommerce.Models.Customer", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("created_at");

                    b.Property<string>("name");

                    b.Property<DateTime>("updated_at");

                    b.HasKey("id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("ECommerce.Models.Product", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("created_at");

                    b.Property<string>("description");

                    b.Property<string>("img_url");

                    b.Property<string>("name");

                    b.Property<int>("quantity");

                    b.Property<DateTime>("updated_at");

                    b.HasKey("id");

                    b.ToTable("Products");
                });
        }
    }
}
