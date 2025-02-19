
var builder = WebApplication.CreateBuilder(args);

string? connectionString = builder.Configuration.GetConnectionString("AzureAppConfiguration");
ArgumentNullException.ThrowIfNullOrWhiteSpace(connectionString);
builder.Configuration.AddAzureAppConfiguration(options =>
{
    options.Connect(connectionString);
    options.UseFeatureFlags(featureFlagOptions =>
    {
        featureFlagOptions.SetRefreshInterval(TimeSpan.FromMinutes(5));
    });
});
builder.Services.AddFeatureManagement();

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
