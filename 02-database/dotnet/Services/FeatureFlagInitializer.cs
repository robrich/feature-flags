namespace FeatureFlagFromDatabase.Services;

public interface IFeatureFlagInitializer
{
    void EnsureInitialized();
}

public class FeatureFlagInitializer(ApplicationDbContext dbContext) : IFeatureFlagInitializer
{

    // TODO: a CI tool should do this instead:
    public void EnsureInitialized()
    {
        dbContext.Database.EnsureCreated();
        if (!dbContext.FeatureFlags.Any())
        {
            foreach (FeatureFlags flag in Enum.GetValues<FeatureFlags>())
            {
                bool value = Random.Shared.Next(0, 10) > 5;
                var expireDate = DateTime.UtcNow.AddDays(60);
                dbContext.FeatureFlags.Add(new FeatureFlag { Key = flag.ToString(), Value = value, ExpireDate = expireDate });
            }
            dbContext.SaveChanges();
        }
    }

}
