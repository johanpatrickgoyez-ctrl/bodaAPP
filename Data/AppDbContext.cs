using bodaAPP.Models;
using Microsoft.EntityFrameworkCore;
using bodaAPP.Models;

namespace TuProyecto.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Invitado> Invitados { get; set; }
    }
}