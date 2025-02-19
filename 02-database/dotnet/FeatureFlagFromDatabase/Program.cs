var builder = WebApplication.CreateBuilder(args);

string? mydb = builder.Configuration.GetConnectionString("MyDB");
ArgumentNullException.ThrowIfNullOrWhiteSpace(mydb);
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(mydb));

builder.Services.AddTransient<IFeatureFlagRepository, FeatureFlagRepository>();
builder.Services.AddTransient<IFeatureFlagInitializer, FeatureFlagInitializer>();

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
	app.UseSwaggerUI(options =>
	{
		options.SwaggerEndpoint("/openapi/v1.json", "v1");
	});
}

app.UseHttpsRedirection();

app.MapControllers();

app.MapGet("/", () =>
{
	return Results.Ok("Feature flag demo is running!\n Go to /swagger");
});

// TODO: a CI tool should do this instead:
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<IFeatureFlagInitializer>().EnsureInitialized();
}

app.Run();
