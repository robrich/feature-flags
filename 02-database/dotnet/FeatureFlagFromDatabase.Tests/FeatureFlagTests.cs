namespace FeatureFlagFromDatabase.Tests;

public class FeatureFlagTests
{
	[Theory]
	[MemberData(nameof(AllFeatureFlagsObj))]
	public void NoExpiredFeatureFlags(FeatureFlags featureFlag)
	{
		// Arrange
		ApplicationDbContext dbContext = DbContextFixture.GetDbContext();
		FeatureFlagRepository repository = new(dbContext);

		// Act
		var flag = repository.GetFeatureFlagObject(featureFlag);

		// Assert
		flag.ShouldNotBeNull(featureFlag.ToString() + " is missing from the database. Delete it from the enum or add it to the database");
		ArgumentNullException.ThrowIfNull(flag);
		flag.ExpireDate.ShouldBeGreaterThan(DateTime.UtcNow);
	}

	private static List<FeatureFlags> AllFeatureFlags =>
		Enum.GetValues<FeatureFlags>().ToList();

	// xUnit: you're dumb with [MemberData()] needing to be public static List<object[]>

	public static List<object[]> AllFeatureFlagsObj => AllFeatureFlags.Select(t => new object[] { t }).ToList();

}
