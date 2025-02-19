namespace FeatureFlagFromConfig;

public record AppSettings(Dictionary<string, bool> FeatureFlags)
{
	public bool FeatureIsEnabled(FeatureFlags featureName) => FeatureFlags.GetValueOrDefault(featureName.ToString());
}

// Avoids magic strings
public enum FeatureFlags
{
    ONE,
    TWO,
    THREE
}
