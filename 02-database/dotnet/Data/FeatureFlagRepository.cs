namespace FeatureFlagFromDatabase.Data;

public interface IFeatureFlagRepository
{
    bool FeatureIsEnabled(FeatureFlags featureFlag);
    FeatureFlag? GetFeatureFlagObject(FeatureFlags featureFlag);
    Dictionary<string, bool> GetAllFeatureFlags();
}

public class FeatureFlagRepository(ApplicationDbContext dbContext) : IFeatureFlagRepository
{
    public bool FeatureIsEnabled(FeatureFlags featureFlag)
    {
        var flag = dbContext.FeatureFlags.FirstOrDefault(f => f.Key == featureFlag.ToString());
        return flag?.Value ?? false;
    }

    public FeatureFlag? GetFeatureFlagObject(FeatureFlags featureFlag) =>
        dbContext.FeatureFlags.FirstOrDefault(f => f.Key == featureFlag.ToString());

    public Dictionary<string, bool> GetAllFeatureFlags()
    {
        return dbContext.FeatureFlags.ToDictionary(f => f.Key, f => f.Value);
    }
}
