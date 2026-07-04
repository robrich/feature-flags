namespace FeatureFlagSplitio.Data;

/*
Split.io feature flags docs:
https://help.split.io/hc/en-us/articles/360020240172--NET-SDK
*/

public interface IFeatureFlagRepository
{
    bool FeatureIsEnabled(FeatureFlags featureFlag, string? user = null, bool defaultValue = false);
    Dictionary<string, bool> GetAllFeatureFlags(string? user = null);
}

public class FeatureFlagRepository(ISplitClient sdk, IConfiguration configuration) : IFeatureFlagRepository
{
    public bool FeatureIsEnabled(FeatureFlags featureFlag, string? user = null, bool defaultValue = false)
    {
        var key = configuration.GetConnectionString("SplitioKey");
        ArgumentNullException.ThrowIfNullOrWhiteSpace(key);
        var attributes = new Dictionary<string, object>
        {
            { "user", user ?? "user" }
        };
        string treatment = sdk.GetTreatment(key, featureFlag.ToString(), attributes);
        bool flagValue = treatment == "on";
        return flagValue;
    }

    public Dictionary<string, bool> GetAllFeatureFlags(string? user = null)
    {
        // Split.io doesn't have a GetAll in the SDK.  The closest is a feature set.
        // https://help.split.io/hc/en-us/articles/360020240172--NET-SDK#multiple-evaluations-at-once

        var results = new Dictionary<string, bool>();
        foreach (var flag in Enum.GetValues<FeatureFlags>())
        {
            results.Add(flag.ToString(), FeatureIsEnabled(flag));
        }
        return results;
    }
}
