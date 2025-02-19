var builder = WebApplication.CreateBuilder(args);

{ // so I can't cheat latter getting IoC service
    var featureFlagsSection = builder.Configuration.GetSection("FeatureFlags");
    var featureFlags = featureFlagsSection.Get<Dictionary<string, bool>>() ?? new Dictionary<string, bool>();
    AppSettings appSettingsBuilt = new AppSettings(featureFlags);
    builder.Services.AddSingleton(appSettingsBuilt);
}
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
