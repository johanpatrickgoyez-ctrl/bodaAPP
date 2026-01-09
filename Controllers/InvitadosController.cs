using bodaAPP.Models;
using Microsoft.AspNetCore.Mvc;
using TuProyecto.Data;
using bodaAPP.Models;

namespace TuProyecto.Controllers
{
    public class InvitadosController : Controller
    {
        private readonly AppDbContext _context;

        public InvitadosController(AppDbContext context)
        {
            _context = context;
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

            _context.Invitados.Add(invitado);
            await _context.SaveChangesAsync();

            int totalPersonas = _context.Invitados.Sum(i => i.NumeroPersonas);

            return Ok(new
            {
                success = true,
                message = "Familia registrada correctamente",
                total = totalPersonas
            });
        }
    }
}