using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace BackendAdministradorDeTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareasController : ControllerBase
    {
        string connection = @"Server=localhost;Database=administrador_de_tareas;User Id=Erick;Password=Erick1999.;";
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Models.Tareas>? listaDeTareas = null;
            using (var db = new MySqlConnection(connection))
            {
                var sql = "select * from tareas ORDER by fecha_inicio asc";
                listaDeTareas = db.Query<Models.Tareas>(sql);
            }
            return Ok(listaDeTareas);
        }

        [HttpGet("filtrar")]
        public IActionResult FiltrarTareas(string? colaborador = null, string? estado = null, string? prioridad = null, DateTime? fecha_inicio = null, DateTime? fecha_fin = null)
        {
            using (var db = new MySqlConnection(connection))
            {
                var sql = "SELECT * FROM tareas WHERE 1=1";
                if (!string.IsNullOrEmpty(colaborador))
                {
                    sql += " AND colaborador = @colaborador";
                }

                if (!string.IsNullOrEmpty(estado))
                {
                    sql += " AND estado = @estado";
                }

                if (!string.IsNullOrEmpty(prioridad))
                {
                    sql += " AND prioridad = @prioridad";
                }

                if (fecha_inicio.HasValue)
                {
                    sql += " AND fecha_inicio >= @fecha_inicio";
                }

                if (fecha_fin.HasValue)
                {
                    sql += " AND fecha_fin <= @fecha_fin";
                }

                var tareasFiltradas = db.Query<Models.Tareas>(sql, new { colaborador, estado, prioridad, fecha_inicio, fecha_fin });

                return Ok(tareasFiltradas);
            }
        }

        [HttpPost]
        public IActionResult Insert(Models.Tareas modelo)
        {
            int result = 0;
            using (var db = new MySqlConnection(connection))
            {
                var sql = "INSERT into tareas (descripcion, colaborador, estado, prioridad, fecha_inicio, fecha_fin, notas)" +
                    " values(@descripcion, @colaborador, @estado, @prioridad, @fecha_inicio, @fecha_fin, @notas)";
                result = db.Execute(sql, modelo);
            }
            return Ok(modelo);

        }


        [HttpPut]
        public IActionResult Edit(Models.Tareas modelo)
        {
            int result = 0;
            using (var db = new MySqlConnection(connection))
            {
                var sql = "UPDATE tareas set descripcion=@descripcion, colaborador=@colaborador, estado=@estado, prioridad=@prioridad, fecha_inicio=@fecha_inicio, fecha_fin=@fecha_fin, notas=@notas" +
                    " where id = @id";

                result = db.Execute(sql, modelo);
            }
            return Ok(modelo);
        }


        [HttpDelete]
        public IActionResult Delete(Models.Tareas modelo)
        {
            int result = 0;
            using (var db = new MySqlConnection(connection))
            {
                var sql = "DELETE from tareas where id=@id";

                result = db.Execute(sql, modelo);
            }
            return Ok(result);
        }
    }
}
