using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bodaAPP.Models;
using TuProyecto.Data;

namespace bodaAPP.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _context;

        public HomeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Registrar(Invitado invitado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Datos inválidos"
                });
            }

            invitado.Confirmacion = null; 

            _context.Invitados.Add(invitado);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Familia registrada correctamente",
                id = invitado.Id
            });
        }

        [HttpPost]
        public async Task<IActionResult> Confirmar(int id, string respuesta)
        {
            var invitado = await _context.Invitados.FindAsync(id);

            if (invitado == null)
                return NotFound();

            invitado.Confirmacion = respuesta; 
            await _context.SaveChangesAsync();

            return Ok(new { success = true });
        }
    }
}