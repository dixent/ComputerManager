using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using IdentityServer4.Models;

namespace ComputerManager.Models
{
    public class Computer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(50, ErrorMessage = "Firm name length can't be more than 50.")]
        [Required(ErrorMessage = "Version should be required.")]

        public string Firm { get; set; }

        [StringLength(50, ErrorMessage = "Version length can't be more than 50.")]
        [Required(ErrorMessage = "Version should be required.")]
        public string Version { get; set; }

        [Required(ErrorMessage = "Price should be required.")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Year should be required.")]
        public int Year { get; set; }

        public Computer() {}

        public Computer(string firm, string version, double price, int year)
        {
            Firm = firm;
            Version = version;
            Price = price;
            Year = year;
        }
    }
}
