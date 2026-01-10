using System.ComponentModel.DataAnnotations;

namespace bodaAPP.Models
{
    public class Invitado
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "Los apellidos son obligatorios")]
        public string Apellidos { get; set; }

        [Required(ErrorMessage = "Debe indicar cuántas personas asistirán")]
        [Range(1, 20, ErrorMessage = "Debe ser al menos 1 persona")]
        public int NumeroPersonas { get; set; }

        public string? Confirmacion { get; set; } 
    }
}