using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using ComputerManager.Data;
using ComputerManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ComputerManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComputersController : ControllerBase
    {
        private ApplicationDbContext db;
        public ComputersController(ApplicationDbContext context)
        {
            db = context;
        }


        [HttpGet("/api/computers")]
        public async Task<IActionResult> Index()
        {
            var computers = await db.computers.ToListAsync();
            return new JsonResult(computers);

        }
        [HttpGet("/api/computers/new")]

        public async Task<IActionResult> New()
        {
            Computer computer = new Computer();
            var result = new JsonResult(computer);

            return new JsonResult(computer);
        }

        [HttpPost("/api/computers")]
        public async Task<IActionResult> Create()
        {
            using (StreamReader stream = new StreamReader(Request.Body, Encoding.UTF8))
            {
                JObject json = JObject.Parse(await stream.ReadToEndAsync());
                Computer computer = json["computer"].ToObject<Computer>();
                if (TryValidateModel(computer))
                {
                    db.computers.Add(computer);
                    await db.SaveChangesAsync();
                    return StatusCode(200);
                } else
                {
                    return new JsonResult(ModelState);
                }             
            }
        }
    }
}
