
var builder = WebApplication.CreateBuilder(args);

// We won't use it yet but let's ensure it's not blank:
string? SplitioKey = builder.Configuration.GetConnectionString("SplitIoKey");
ArgumentNullException.ThrowIfNullOrWhiteSpace(SplitioKey);
string? SplitioSecret = builder.Configuration.GetConnectionString("SplitIoSecret");
ArgumentNullException.ThrowIfNullOrWhiteSpace(SplitioSecret);

var config = new ConfigurationOptions();
var factory = new SplitFactory(SplitioSecret, config);
ISplitClient sdk = factory.Client();
sdk.BlockUntilReady(10000);
builder.Services.AddSingleton<ISplitClient>(sdk);

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
