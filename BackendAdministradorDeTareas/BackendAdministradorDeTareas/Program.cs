var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración de CORS para permitir solicitudes desde http://localhost:3000
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware para permitir CORS
app.UseCors("AllowReactDev");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
