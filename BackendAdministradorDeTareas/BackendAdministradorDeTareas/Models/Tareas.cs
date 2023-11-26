namespace BackendAdministradorDeTareas.Models
{
    public class Tareas
    {
        public int? Id { get; set; }
        public string? descripcion { get; set; }
        public string? colaborador { get; set; }
        public string? estado { get; set; }
        public string? prioridad { get; set; }
        public DateTime fecha_inicio { get; set; }
        public DateTime fecha_fin { get; set; }
        public string? notas { get; set; }
    }
}
