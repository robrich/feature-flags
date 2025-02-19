namespace FeatureFlagWithOverrides.Data;

public interface IFeatureFlagRepository
{
    bool FeatureIsEnabled(FeatureFlags featureFlag, string? name);
    Dictionary<string, bool> GetAllFeatureFlags(string? name);
}

public class FeatureFlagRepository(ApplicationDbContext dbContext) : IFeatureFlagRepository
{
    public bool FeatureIsEnabled(FeatureFlags featureFlag, string? name)
    {
        var flag = dbContext.FeatureFlags.FirstOrDefault(f => f.Key == featureFlag.ToString());
        bool result = flag?.Value ?? false;
        if (!string.IsNullOrEmpty(name))
        {
            var userFlag = dbContext.UserFlags.FirstOrDefault(f => f.FeatureFlagKey == featureFlag.ToString() && f.User.Name == name);
            if (userFlag != null)
            {
                result = userFlag.Value;
            }
        }
        return result;
    }

    public Dictionary<string, bool> GetAllFeatureFlags(string? name)
    {
        var features = dbContext.FeatureFlags.ToList();
        foreach (FeatureFlags flag in Enum.GetValues<FeatureFlags>())
        {
            var feature = features.FirstOrDefault(f => f.Key == flag.ToString());
            if (feature == null)
            {
                feature = new FeatureFlag { Key = flag.ToString(), Value = false };
                features.Add(feature);
            }
        }
        if (!string.IsNullOrEmpty(name))
        {
            var userFlags = dbContext.UserFlags.Where(f => f.User.Name == name).ToList();
            foreach (var userFlag in userFlags)
            {
                var feature = features.FirstOrDefault(f => f.Key == userFlag.FeatureFlagKey);
                if (feature != null)
                {
                    feature.Value = userFlag.Value; // FRAGILE: mutating EntityFramework's cache but intentionally not saving it
                }
                else
                {
                    features.Add(new FeatureFlag { Key = userFlag.FeatureFlagKey, Value = userFlag.Value });
                }
            }
        }
        var results = (
            from f in features
            orderby f.Key
            select f
        ).ToDictionary(f => f.Key, f => f.Value);
        return results;
    }
}
