namespace FeatureFlagFromDatabase.Tests.Fixtures;

public static class DbContextFixture
{
	public static IConfiguration GetConfiguration()
	{
		return new ConfigurationBuilder()
			.AddJsonFile("appsettings.json")
			.AddJsonFile("appsettings.Development.json")
			.Build();
	}

	public static ApplicationDbContext GetDbContext()
	{
		var configuration = GetConfiguration();
		var connstr = configuration.GetConnectionString("MyDB");
		string file = Path.GetFullPath(connstr?.Split("=").Last() ?? "");
		File.Exists(file).ShouldBeTrue(connstr+": db file not found. Check the connection string in appsettings.json.");

		var options = new DbContextOptionsBuilder<ApplicationDbContext>();
		options.UseSqlite(connstr);
		var dbContext = new ApplicationDbContext(options.Options);
		dbContext.Database.EnsureCreated();
		return dbContext;
	}
}
