namespace FeatureFlagLaunchDarkly.Data;

/*
Launch Darkly docs:
- https://docs.launchdarkly.com/home/getting-started
- https://docs.launchdarkly.com/sdk/server-side/dotnet
*/

public interface IFeatureFlagRepository
{
    bool FeatureIsEnabled(FeatureFlags featureFlag, string? user = null, bool defaultValue = false);
    Dictionary<string, bool> GetAllFeatureFlags(string? user = null);
}

public class FeatureFlagRepository(ILdClient launchDarklyClient) : IFeatureFlagRepository
{
    public bool FeatureIsEnabled(FeatureFlags featureFlag, string? user = null, bool defaultValue = false)
    {
        // A context is a person, service, or machine
        // https://docs.launchdarkly.com/sdk/features/context-config
        var context = Context.Builder("demo")
            .Kind("user")
            .Name(user ?? "")
            .Build();

        bool flagValue = launchDarklyClient.BoolVariation(featureFlag.ToString(), context, defaultValue);
        return flagValue;
    }

    public Dictionary<string, bool> GetAllFeatureFlags(string? user = null)
    {
        var context = Context.Builder("demo")
            .Kind("user")
            .Name(user ?? "")
            .Build();

        var state = launchDarklyClient.AllFlagsState(context);
        if (state == null)
        {
            return new Dictionary<string, bool>();
        }
        var values = state.ToValuesJsonMap();

        return values.ToDictionary(v => v.Key, v => v.Value.AsBool);
    }
}
