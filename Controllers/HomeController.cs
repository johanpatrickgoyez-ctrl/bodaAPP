using Microsoft.AspNetCore.Mvc;
using bodaAPP.Models;

namespace bodaAPP.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Registrar(Invitado invitado)
        {
            if (ModelState.IsValid)
            {
                // Aquí luego conectaremos SQL Server
                return RedirectToAction("Index");
            }

            return View("Index");
        }
    }
}