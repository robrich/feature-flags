
var builder = WebApplication.CreateBuilder(args);

string? harnessioConfig = builder.Configuration.GetConnectionString("Harnessio");
ArgumentNullException.ThrowIfNullOrWhiteSpace(harnessioConfig);

var config = Config.Builder()
                .SetPollingInterval(60000)
                .SetAnalyticsEnabled()
                .SetStreamEnabled(true)
                .Build();

await CfClient.Instance.Initialize(harnessioConfig, config);
ICfClient cfClient = CfClient.Instance;
builder.Services.AddSingleton<ICfClient>(cfClient);

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
