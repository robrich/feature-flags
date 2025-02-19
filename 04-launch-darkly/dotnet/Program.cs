
var builder = WebApplication.CreateBuilder(args);

string? launchDarklyConfig = builder.Configuration.GetConnectionString("LaunchDarkly");
ArgumentNullException.ThrowIfNullOrWhiteSpace(launchDarklyConfig);
var config = Configuration.Builder(launchDarklyConfig)
  .StartWaitTime(TimeSpan.FromSeconds(5))
  .Build();
ILdClient client = new LdClient(config);
builder.Services.AddSingleton<ILdClient>(client);

builder.Services.AddTransient<IFeatureFlagRepository, FeatureFlagRepository>();

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

app.Run();
