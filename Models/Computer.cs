using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ComputerManager.Models
{
    public class Computer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(50)]

        [Required]
        public string Firm { get; set; }
        [StringLength(50)]

        [Required]
        public string Version { get; set; }

        [Required]
        public double Price { get; set; }
        [StringLength(50)]
        [Required]
        [Display(Name = "Year of issue")]
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
