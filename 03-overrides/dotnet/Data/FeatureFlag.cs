namespace FeatureFlagWithOverrides.Data;

public class FeatureFlag
{
    [Key]
    public string Key { get; set; } = "";
    public bool Value { get; set; }
}

// Avoids magic strings
public enum FeatureFlags
{
    ONE,
    TWO,
    THREE
}
