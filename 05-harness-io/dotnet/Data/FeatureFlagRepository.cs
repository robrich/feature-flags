namespace FeatureFlagHarnessio.Data;

/*
Harness.io feature flags docs:
https://developer.harness.io/docs/feature-flags/use-ff/ff-sdks/server-sdks/net-sdk-reference
*/

public interface IFeatureFlagRepository
{
    bool FeatureIsEnabled(FeatureFlags featureFlag, string? user = null, bool defaultValue = false);
    Dictionary<string, bool> GetAllFeatureFlags(string? user = null);
}

public class FeatureFlagRepository(ICfClient harnessioClient) : IFeatureFlagRepository
{
    public bool FeatureIsEnabled(FeatureFlags featureFlag, string? user = null, bool defaultValue = false)
    {
        Target target = Target.builder()
                .Name("name")
                .Identifier(user)
                .build();

        bool flagValue = harnessioClient.boolVariation(featureFlag.ToString(), target, defaultValue);
        return flagValue;
    }

    public Dictionary<string, bool> GetAllFeatureFlags(string? user = null)
    {
        // Harness doesn't have a GetAll in the SDK
        // https://apidocs.harness.io/tag/Feature-Flags/#operation/GetAllFeatures

        var results = new Dictionary<string, bool>();
        foreach (var flag in Enum.GetValues<FeatureFlags>())
        {
            results.Add(flag.ToString(), FeatureIsEnabled(flag));
        }
        return results;
    }
}
