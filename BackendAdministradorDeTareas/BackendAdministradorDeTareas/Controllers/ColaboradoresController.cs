using Dapper;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace BackendAdministradorDeTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColaboradoresController : ControllerBase
    {
        string connection = @"Server=localhost;Database=administrador_de_tareas;User Id=Erick;Password=Erick1999.;";

        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Models.Colaboradores>? listaDeColaboradores = null;
            using (var db = new MySqlConnection(connection))
            {
                var sql = "select id,nombre from colaborador";
                listaDeColaboradores = db.Query<Models.Colaboradores>(sql);
            }
            return Ok(listaDeColaboradores);
        }
    }
}